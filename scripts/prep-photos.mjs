// One-off: turns LYNN's own photos in research/ into web-sized JPEGs in public/photos/.
import sharp from 'sharp'

const src = 'research/photos'
const out = 'public/photos'

const jobs = [
  ['owner-google/shopfront-night.jpg', 'window-night.jpg', { width: 1600 }],
  ['owner-instagram/2026-10-15-aboard-herbal-tea.jpg', 'terrace-day.jpg', { width: 1080 }],
  ['owner-google/cannoli-counter.jpg', 'counter.jpg', { width: 1600 }],
  ['owner-instagram/2026-09-24-caprese-focaccia.jpg', 'caprese-focaccia.jpg', { width: 900, crop: { top: 380, height: 1300 } }],
  ['owner-instagram/2026-10-02-strawberry-matcha-square.jpg', 'matcha-square.jpg', { width: 900 }],
  ['owner-instagram/2026-10-02-iced-matcha-layers.jpg', 'matcha-layers.jpg', { width: 900 }],
  ['owner-instagram/2026-10-04-braised-pork-belly.jpg', 'pork-belly.jpg', { width: 900 }],
  ['owner-instagram/2026-10-04-bbq-carrots.jpg', 'bbq-carrots.jpg', { width: 900 }],
  ['owner-instagram/2026-10-04-sauteed-prawns.jpg', 'sauteed-prawns.jpg', { width: 900 }],
  ['owner-instagram/2026-10-04-starter-plate.jpg', 'starter-plate.jpg', { width: 900 }],
  ['owner-google/dinner-chicken-salsa.jpg', 'dinner-pass.jpg', { width: 900 }],
  ['owner-google/dinner-glazed-wings.jpg', 'dinner-wings.jpg', { width: 900 }],
  ['owner-instagram/2026-09-28-sunday-roast.jpg', 'sunday-roast.jpg', { width: 900, crop: { top: 380, height: 1540 } }],
]

for (const [from, to, opt] of jobs) {
  let img = sharp(`${src}/${from}`)
  if (opt.crop) {
    const meta = await img.metadata()
    img = img.extract({ left: 0, top: opt.crop.top, width: meta.width, height: Math.min(opt.crop.height, meta.height - opt.crop.top) })
  }
  const info = await img
    .resize({ width: opt.width, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true, progressive: true })
    .toFile(`${out}/${to}`)
  console.log(to, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`)
}
