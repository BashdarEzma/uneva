# Samples the dominant (most saturated) color from public/logo.png and writes
# src/styles/brand.css with the --brand CSS variable. Re-run after replacing the logo:
#   npm run theme
Add-Type -AssemblyName System.Drawing

$logo = Join-Path $PSScriptRoot '..\src\images\logo.png'
$out  = Join-Path $PSScriptRoot '..\src\styles\brand.css'

if (-not (Test-Path $logo)) { Write-Error "logo.png not found at $logo"; exit 1 }

$bmp = New-Object System.Drawing.Bitmap $logo
$counts = @{}
# sample at most ~400x400 points for speed on large logos
$stepX = [Math]::Max(1, [int]($bmp.Width / 400))
$stepY = [Math]::Max(1, [int]($bmp.Height / 400))
for ($y = 0; $y -lt $bmp.Height; $y += $stepY) {
  for ($x = 0; $x -lt $bmp.Width; $x += $stepX) {
    $p = $bmp.GetPixel($x, $y)
    if ($p.A -lt 128) { continue }                 # skip transparent
    $max = [Math]::Max($p.R, [Math]::Max($p.G, $p.B))
    $min = [Math]::Min($p.R, [Math]::Min($p.G, $p.B))
    if (($max - $min) -lt 35) { continue }          # skip near white / gray / black
    $key = '{0},{1},{2}' -f $p.R, $p.G, $p.B
    if ($counts.ContainsKey($key)) { $counts[$key]++ } else { $counts[$key] = 1 }
  }
}
$bmp.Dispose()

if ($counts.Count -eq 0) {
  # logo has no saturated color (pure black/white) -> fall back to a neutral dark
  $r = 17; $g = 19; $b = 24
} else {
  $top = $counts.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1
  $rgb = $top.Key -split ','
  $r = [int]$rgb[0]; $g = [int]$rgb[1]; $b = [int]$rgb[2]
}

# a darker shade for gradients
$rd = [int]($r * 0.45); $gd = [int]($g * 0.45); $bd = [int]($b * 0.45)
$hex  = '#{0:X2}{1:X2}{2:X2}' -f $r, $g, $b

$css = @"
/* AUTO-GENERATED from public/logo.png by scripts/extract-brand.ps1 — do not edit by hand. */
/* Re-run "npm run theme" after replacing the logo to recolor the site. */
:root {
  --brand: $hex;
  --brand-rgb: $r, $g, $b;
  --brand-dark: rgb($rd, $gd, $bd);
}
"@

Set-Content -Path $out -Value $css -Encoding utf8
Write-Output "Brand color $hex written to src/styles/brand.css"
