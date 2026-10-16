import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { board, type MenuGroup, type Photo } from '../data/lynn'

export function Quote({ text, who }: { text: string; who: string }) {
  return (
    <blockquote className="quote">
      <p>“{text}”</p>
      <footer>{who}</footer>
    </blockquote>
  )
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Figure({ photo, caption, tall }: { photo: Photo; caption?: string; tall?: boolean }) {
  return (
    <figure className={`photo${tall ? ' photo--tall' : ''}`}>
      <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function MenuGroups({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="menu-cols">
      {groups.map((g) => (
        <section className="menu-group" key={g.title}>
          <h3 className="menu-group__title">
            {g.title}
            {g.note && <span className="menu-group__note">{g.note}</span>}
          </h3>
          <ul className="menu-items">
            {g.items.map((it) => (
              <li className="menu-item" key={it.name + (it.price ?? '')}>
                <span className="menu-item__name">
                  {it.name}
                  {it.tag && <span className="menu-item__tag">{it.tag}</span>}
                </span>
                {it.price ? <span className="menu-item__price">{it.price}</span> : <span />}
                {it.desc && <span className="menu-item__desc">{it.desc}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

// The wooden A-board by the door, chalked in white and yellow.
export function ABoard({ caption }: { caption?: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="chalk">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feComponentTransfer in="n" result="speck">
            <feFuncA type="discrete" tableValues="1 1 0.4 1 1 0.6 1" />
          </feComponentTransfer>
          <feComposite in="d" in2="speck" operator="in" />
        </filter>
      </svg>
      <div className="aboard">
        <div className="aboard__slate">
          <span className="aboard__line chalk" style={{ color: '#f4f0e8', fontSize: 34, letterSpacing: '0.1em' }}>
            Lynn
          </span>
          {board.lines.map((l) => (
            <span className="aboard__line chalk" key={l}>
              {l}
            </span>
          ))}
          <span className="aboard__foot chalk">{board.footer}</span>
        </div>
      </div>
      {caption && <figcaption className="aboard__caption">{caption}</figcaption>}
    </figure>
  )
}
