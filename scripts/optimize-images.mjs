// Generates web-optimized copies of every raster image under src/images/ into
// src/images-web/, preserving the relative path (extension becomes .webp).
// Originals in src/images/ are never modified. Run: npm run images
//
// Large product photos are shipped at print resolution (some 20000+ px, 30+ MB);
// this downscales them to a web-appropriate size and re-encodes as WebP, which
// typically cuts each file 100-250x with no visible quality loss at display size.
//
// Animated GIFs are a special case: sharp's bundled libvips can't decode their
// frames (and re-encoding tends to grow them or alter their timing), so they're
// copied through unchanged and kept as .gif. The browser animates them natively,
// which lets a slider treat them as a normal (looping) image slide.
import { readdirSync, statSync, mkdirSync, existsSync, copyFileSync, rmSync } from 'node:fs'
import { join, relative, dirname, extname } from 'node:path'
import sharp from 'sharp'

const SRC = 'src/images'
const OUT = 'src/images-web'
const MAX_EDGE = 1600 // longest side, in px — plenty for full-bleed hero on 2x displays
// Category/home banner slides are full-bleed and authored at 3790×1785, so they
// get a larger cap to stay crisp on wide/hi-dpi screens.
const MAX_EDGE_SLIDE = 3840
const QUALITY = 80
const RASTER = new Set(['.png', '.jpg', '.jpeg', '.gif'])

// Longest-side cap for a given source file (slides keep more resolution).
const maxEdgeFor = (file) => (/(^|[\\/])Slides[\\/]/.test(relative(SRC, file)) ? MAX_EDGE_SLIDE : MAX_EDGE)

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, acc)
    else if (RASTER.has(extname(name).toLowerCase())) acc.push(p)
  }
  return acc
}

// Every file under dir (used to scan the output tree for orphans).
function walkAll(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walkAll(p, acc)
    else acc.push(p)
  }
  return acc
}

// A fresh clone has only logo.png under src/images/ (the raw originals are not
// committed) and uses the committed src/images-web/ as-is. Bail out early so the
// orphan-pruning pass below doesn't delete every committed copy.
if (!readdirSync(SRC).some((n) => statSync(join(SRC, n)).isDirectory())) {
  console.log(`Raw originals not present under ${SRC}/ - using committed ${OUT}/ as-is.`)
  process.exit(0)
}

const files = walk(SRC)
let done = 0, srcBytes = 0, outBytes = 0, skipped = 0
console.log(`Optimizing ${files.length} images -> ${OUT}/  (max ${MAX_EDGE}px, webp q${QUALITY})`)

for (const file of files) {
  const isGif = extname(file).toLowerCase() === '.gif'
  const rel = isGif
    ? relative(SRC, file) // keep animated GIFs as .gif
    : relative(SRC, file).replace(/\.(png|jpe?g)$/i, '.webp')
  const dest = join(OUT, rel)
  srcBytes += statSync(file).size

  // Skip if already generated and up to date
  if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(file).mtimeMs) {
    outBytes += statSync(dest).size
    skipped++
    done++
    continue
  }

  mkdirSync(dirname(dest), { recursive: true })
  if (isGif) {
    copyFileSync(file, dest) // keep animated GIFs verbatim
    outBytes += statSync(dest).size
    done++
    if (done % 20 === 0) console.log(`  ${done}/${files.length}`)
    continue
  }
  try {
    const maxEdge = maxEdgeFor(file)
    await sharp(file, { failOn: 'none', limitInputPixels: false })
      .rotate() // honor EXIF orientation
      .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest)
    outBytes += statSync(dest).size
  } catch (e) {
    console.warn('  FAILED', file, '-', e.message)
    continue
  }
  done++
  if (done % 20 === 0) console.log(`  ${done}/${files.length}`)
}

// Prune orphaned image outputs whose source has been removed or renamed (e.g. a
// slide replaced by one with a different name, or a .png swapped for a .gif) so
// images-web/ stays in sync — stale copies would otherwise linger as phantom
// slides or collide with a same-named new source. Only .webp/.gif (this script's
// outputs) are considered; .mp4 belongs to optimize-videos.mjs.
let pruned = 0
for (const out of walkAll(OUT)) {
  const ext = extname(out).toLowerCase()
  const rel = relative(OUT, out)
  let hasSource
  if (ext === '.webp') {
    const base = rel.replace(/\.webp$/i, '')
    hasSource = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'].some((e) => existsSync(join(SRC, base + e)))
  } else if (ext === '.gif') {
    hasSource = existsSync(join(SRC, rel))
  } else {
    continue // leave videos (.mp4) and anything else untouched
  }
  if (!hasSource) {
    rmSync(out)
    pruned++
    console.log('  pruned orphan:', rel)
  }
}

const mb = (b) => (b / 1048576).toFixed(1) + ' MB'
console.log(`\nDone. ${done} images (${skipped} already current${pruned ? `, ${pruned} pruned` : ''}).`)
console.log(`  source: ${mb(srcBytes)}  ->  web: ${mb(outBytes)}  (${(srcBytes / Math.max(outBytes, 1)).toFixed(0)}x smaller)`)
