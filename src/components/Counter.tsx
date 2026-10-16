import { useState } from 'react'
import { motion } from 'framer-motion'
import { cannoli, photos } from '../data/lynn'

// The cannoli cabinet, from LYNN's own photo. The flavour cards are the ones
// written on the counter; tap one and the photo slides to that tray.
const ZOOM = 2.3

function framing(i: number | null) {
  if (i === null) return { scale: 1, x: '0%', y: '0%' }
  const { fx, fy } = cannoli[i]
  const clamp = (v: number) => Math.min(0, Math.max((1 - ZOOM) * 100, v))
  return { scale: ZOOM, x: `${clamp((0.5 - ZOOM * fx) * 100)}%`, y: `${clamp((0.5 - ZOOM * fy) * 100)}%` }
}

export function Counter() {
  const [pick, setPick] = useState<number | null>(null)
  const current = pick === null ? null : cannoli[pick]

  return (
    <div className="counter">
      <div className="counter__stage">
        <motion.img
          className="counter__img"
          src={photos.counter.src}
          alt={photos.counter.alt}
          width={photos.counter.w}
          height={photos.counter.h}
          loading="lazy"
          initial={false}
          animate={framing(pick)}
          transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.9 }}
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {current ? `Showing the ${current.name} tray` : 'Showing the whole cabinet'}
      </p>
      <ul className="cards" aria-label="Cannoli flavours">
        {cannoli.map((c, i) => (
          <li key={c.name} style={{ transform: `rotate(${i % 2 ? 1.2 : -1.4}deg)` }}>
            <button
              type="button"
              className="card-tag"
              aria-pressed={pick === i}
              onClick={() => setPick(pick === i ? null : i)}
            >
              {c.name}
              {c.note && <small>({c.note})</small>}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="textlink counter__reset"
        onClick={() => setPick(null)}
        style={{ visibility: pick === null ? 'hidden' : 'visible' }}
      >
        Whole cabinet
      </button>
    </div>
  )
}
