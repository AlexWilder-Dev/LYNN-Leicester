import { motion } from 'framer-motion'
import { photos, service, week, words, type Word } from '../data/lynn'
import { useLight } from '../lib/light'
import { clock, isOpen, litWords, statusLine } from '../lib/time'

// LYNN's front window has COFFEE / BRUNCH / COCKTAILS / DINNER stacked on the glass.
// Here the words light up for the real time in Leicester, and the clock on the sill
// runs the day forward: brunch goes off at three, the room goes dark and the globes
// come on for Friday and Saturday dinner.

const START = 9 * 60
const END = 22 * 60
const ticks = [9, 12, 15, 18, 21]
const dayOrder = [1, 2, 3, 4, 5, 6, 0]

const pct = (m: number) => ((Math.min(Math.max(m, START), END) - START) / (END - START)) * 100

function wordWhen(word: Word, day: number): string {
  const d = week[day]
  switch (word) {
    case 'Coffee':
      return d.close ? `till ${clock(d.close)}` : ''
    case 'Brunch':
      return `till ${clock(service.brunchEnd)}`
    default:
      return d.close ? `till ${clock(d.close)}` : ''
  }
}

// Tapping a word takes the window to a time when it's on.
function momentFor(word: Word, day: number) {
  if (word === 'Cocktails' || word === 'Dinner') {
    return { day: service.dinnerDays.includes(day) ? day : 5, minutes: 19 * 60 + 30 }
  }
  const openDay = week[day].open === null ? (day + 1) % 7 : day
  return { day: openDay, minutes: word === 'Coffee' ? 10 * 60 + 30 : 11 * 60 + 30 }
}

export function Window() {
  const { moment, live, night, setMoment, backToNow } = useLight()
  const lit = litWords(moment)
  const open = isOpen(moment)
  const d = week[moment.day]

  return (
    <section className="window" aria-label="The window at LYNN">
      <div className="window__glass">
        <motion.img
          className="window__photo window__photo--day"
          src={photos.terraceDay.src}
          alt={photos.terraceDay.alt}
          width={photos.terraceDay.w}
          height={photos.terraceDay.h}
          initial={false}
          animate={{ opacity: night ? 0 : 1 }}
          transition={{ duration: 0.9 }}
        />
        <motion.img
          className="window__photo window__photo--night"
          src={photos.windowNight.src}
          alt={photos.windowNight.alt}
          width={photos.windowNight.w}
          height={photos.windowNight.h}
          initial={false}
          animate={{ opacity: night ? 1 : 0 }}
          transition={{ duration: 0.9 }}
        />
        <div className="window__scrim" />
        <ul className="vinyl" aria-label="What's on">
          {words.map((w) => (
            <li key={w}>
              <motion.button
                type="button"
                onClick={() => setMoment(momentFor(w, moment.day))}
                aria-pressed={lit[w]}
                aria-label={`${w}${lit[w] ? ', on now' : ''}. Show when.`}
                initial={false}
                animate={{
                  opacity: lit[w] ? 1 : 0.32,
                  textShadow: lit[w] && night ? '0 0 18px rgba(242,177,92,0.55)' : '0 0 0 rgba(242,177,92,0)',
                }}
                transition={{ duration: 0.5 }}
              >
                {w}
              </motion.button>
              <motion.span
                className="vinyl__when"
                initial={false}
                animate={{ opacity: lit[w] ? 1 : 0, x: lit[w] ? 0 : -6 }}
                transition={{ duration: 0.4 }}
                aria-hidden={!lit[w]}
              >
                {lit[w] ? wordWhen(w, moment.day) : ''}
              </motion.span>
            </li>
          ))}
        </ul>
        {!open && <span className="window__closed">{d.open === null ? `Closed ${d.name}s` : 'Closed'}</span>}
      </div>

      <div className="sill">
        <div className="sill__days" role="group" aria-label="Day">
          {dayOrder.map((i) => (
            <button
              key={i}
              type="button"
              className={`sill__day${week[i].open === null ? ' sill__day--shut' : ''}`}
              aria-pressed={moment.day === i}
              aria-label={`${week[i].name}${week[i].open === null ? ', closed' : ''}`}
              onClick={() => setMoment({ day: i, minutes: moment.minutes })}
            >
              {week[i].short.slice(0, 3)}
            </button>
          ))}
        </div>
        <div className="sill__row">
          <output className="sill__time" aria-live="polite">{clock(moment.minutes)}</output>
          <div className="clockbar">
            <input
              type="range"
              min={START}
              max={END}
              step={15}
              value={Math.min(Math.max(moment.minutes, START), END)}
              onChange={(e) => setMoment({ day: moment.day, minutes: Number(e.target.value) })}
              aria-label="Time of day"
              aria-valuetext={`${week[moment.day].name} ${clock(moment.minutes)}. ${statusLine(moment).text}`}
            />
            <div className="clockbar__track">
              {d.open !== null && d.close !== null && (
                <span className="clockbar__open" style={{ left: `${pct(d.open)}%`, right: `${100 - pct(d.close)}%` }} />
              )}
            </div>
            <div className="clockbar__ticks" aria-hidden="true">
              {ticks.map((h) => (
                <span key={h} style={{ left: `${pct(h * 60)}%` }}>
                  {String(h).padStart(2, '0')}
                </span>
              ))}
            </div>
            <motion.span
              className="clockbar__knob"
              initial={false}
              animate={{ left: `${pct(moment.minutes)}%` }}
              transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            />
          </div>
          <button type="button" className="sill__now" onClick={backToNow} disabled={live}>
            Now
          </button>
        </div>
      </div>
    </section>
  )
}

export function WindowStatus() {
  const { moment, live, backToNow } = useLight()
  const s = statusLine(moment)
  return (
    <div className="status" role="status">
      <span className={`status__dot${s.open ? ' status__dot--open' : ''}`} aria-hidden="true" />
      <div>
        <p className="status__text">{s.text}</p>
        <p className="status__sub">
          {live ? (
            <>Right now in Leicester. Drag the clock or tap a word on the glass to see the rest of the week.</>
          ) : (
            <>
              Showing {week[moment.day].name} at {clock(moment.minutes)}.{' '}
              <button type="button" onClick={backToNow}>
                Back to now
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
