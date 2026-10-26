// Transcodes every video under src/images/ into a web-optimized copy under
// src/images-web/ (same relative path). Hero clips are supplied as huge
// source files (tv.mp4 is ~27 MB); this downscales to <=1280px wide, re-encodes
// H.264 at a sane bitrate, strips audio (heroes autoplay muted) and enables
// faststart for instant streaming — typically 10-20x smaller. Run: npm run videos
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs'
import { join, relative, dirname, extname } from 'node:path'
import { spawnSync } from 'node:child_process'
import ffmpegPath from 'ffmpeg-static'

const SRC = 'src/images'
const OUT = 'src/images-web'
const VIDEO = new Set(['.mp4', '.webm', '.mov', '.m4v'])
const MAX_W = 1280
const CRF = 26

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, acc)
    else if (VIDEO.has(extname(name).toLowerCase())) acc.push(p)
  }
  return acc
}

const files = walk(SRC)
if (!files.length) { console.log('No videos found under', SRC); process.exit(0) }
console.log(`Optimizing ${files.length} video(s) -> ${OUT}/  (<=${MAX_W}px, h264 crf${CRF}, no audio)`)

let srcBytes = 0, outBytes = 0
const mb = (b) => (b / 1048576).toFixed(1) + ' MB'

for (const file of files) {
  const rel = relative(SRC, file).replace(/\.[^./]+$/, '.mp4')
  const dest = join(OUT, rel)
  srcBytes += statSync(file).size

  if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(file).mtimeMs) {
    outBytes += statSync(dest).size
    console.log('  current:', rel)
    continue
  }

  mkdirSync(dirname(dest), { recursive: true })
  const args = [
    '-y', '-i', file,
    '-vf', `scale='min(${MAX_W},iw)':-2`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(CRF),
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-an',
    dest,
  ]
  const r = spawnSync(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] })
  if (r.status !== 0) {
    console.warn('  FAILED', rel, '-', (r.stderr?.toString() || '').split('\n').slice(-3).join(' '))
    continue
  }
  outBytes += statSync(dest).size
  console.log(`  ${rel}: ${mb(statSync(file).size)} -> ${mb(statSync(dest).size)}`)
}

console.log(`\nDone. source: ${mb(srcBytes)} -> web: ${mb(outBytes)} (${(srcBytes / Math.max(outBytes, 1)).toFixed(0)}x smaller)`)
