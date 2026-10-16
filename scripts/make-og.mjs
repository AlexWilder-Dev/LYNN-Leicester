// One-off: public/og.jpg (1200x630) for link previews. LYNN's own night shot of the
// window with their wordmark in a black tile, like the Instagram avatar.
import sharp from 'sharp'
import { stat } from 'node:fs/promises'

const W = 1200
const H = 630
const photo = await sharp('research/photos/owner-google/shopfront-night.jpg')
  .resize({ width: W, height: H, fit: 'cover', position: 'top' })
  .modulate({ brightness: 1.04 })
  .toBuffer()

const mark = `
  <path d="M0 0H20V148H65V165H0Z"/>
  <path d="M20 0H41.5L54.5 50L68 0H88.5L65.5 96V165H45V96Z"/>
  <path d="M86 0H106V165H86Z"/>
  <path d="M91.6 0H111.5L141.2 165H121.3Z"/>
  <path d="M126 0H163V165H126Z"/>
  <path d="M148.6 0H168.5L198.2 165H178.3Z"/>
  <path d="M183 0H203V165H183Z"/>`

const tileW = 232
const markW = 156
const s = markW / 203
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="48" y="${H - 48 - tileW}" width="${tileW}" height="${tileW}" fill="#12110E"/>
  <g transform="translate(${48 + (tileW - markW) / 2} ${H - 48 - tileW + (tileW - 165 * s) / 2}) scale(${s})" fill="#FFF6E6">${mark}</g>
</svg>`

await sharp(photo)
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 80, mozjpeg: true, progressive: true })
  .toFile('public/og.jpg')

const meta = await sharp('public/og.jpg').metadata()
const { size } = await stat('public/og.jpg')
console.log(`og.jpg ${meta.width}x${meta.height} ${meta.format} ${Math.round(size / 1024)}KB`)
if (meta.width !== W || meta.height !== H || size > 300 * 1024) process.exit(1)
