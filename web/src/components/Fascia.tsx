import { useEffect, useRef } from 'react'
import { setFasciaVisible } from '../lib/fascia'
import { LynnMark } from './LynnMark'
import { Pendants } from './Pendants'

// The sign band over LYNN's window: the wordmark with room to breathe,
// and the globe lights hanging from the ceiling line.
export function Fascia() {
  const markRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = markRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setFasciaVisible(entry.isIntersecting), {
      rootMargin: '-62px 0px 0px 0px',
    })
    io.observe(el)
    return () => {
      io.disconnect()
      setFasciaVisible(false)
    }
  }, [])

  return (
    <section className="fascia" aria-label="LYNN, 14 St Martins Square, Leicester">
      <Pendants />
      <div className="fascia__mark" ref={markRef}>
        <LynnMark />
      </div>
      <p className="fascia__line">14 St Martins Square · Leicester</p>
    </section>
  )
}
