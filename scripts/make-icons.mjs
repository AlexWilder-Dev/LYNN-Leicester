// One-off: favicon and apple-touch-icon from LYNN's wordmark, white on black like their Instagram avatar.
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

const mark = `
  <path d="M0 0H20V148H65V165H0Z"/>
  <path d="M20 0H41.5L54.5 50L68 0H88.5L65.5 96V165H45V96Z"/>
  <path d="M86 0H106V165H86Z"/>
  <path d="M91.6 0H111.5L141.2 165H121.3Z"/>
  <path d="M126 0H163V165H126Z"/>
  <path d="M148.6 0H168.5L198.2 165H178.3Z"/>
  <path d="M183 0H203V165H183Z"/>`

// Square tile with the mark centred, ~72% wide.
const tile = (size, pad) => {
  const w = size - pad * 2
  const s = w / 203
  const h = 165 * s
  const y = (size - h) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#12110E"/>
  <g transform="translate(${pad} ${y}) scale(${s})" fill="#FFF6E6">${mark}</g>
</svg>`
}

await writeFile('public/favicon.svg', tile(64, 9))
await sharp(Buffer.from(tile(32, 4))).png().toFile('public/favicon-32.png')
await sharp(Buffer.from(tile(180, 28))).png().toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(tile(512, 80))).png().toFile('public/icon-512.png')
console.log('icons written')
