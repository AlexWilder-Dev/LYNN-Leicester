import { service, week, type Word } from '../data/lynn'

export type Moment = { day: number; minutes: number }

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

const dayIndex: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

/** The current day and time in Leicester, whatever the visitor's own clock says. */
export function leicesterNow(date = new Date()): Moment {
  const parts = fmt.formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return { day: dayIndex[get('weekday')] ?? 0, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export const clock = (m: number) => {
  const h = Math.floor(m / 60) % 24
  const min = m % 60
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`
}

export const isOpen = ({ day, minutes }: Moment) => {
  const d = week[day]
  return d.open !== null && d.close !== null && minutes >= d.open && minutes < d.close
}

export const isNight = ({ minutes }: Moment) => minutes >= service.evening || minutes < 7 * 60

/** Which of the four window words are "on" at a given moment. */
export function litWords({ day, minutes }: Moment): Record<Word, boolean> {
  const open = isOpen({ day, minutes })
  const dinnerDay = service.dinnerDays.includes(day)
  const evening = minutes >= service.evening
  return {
    Coffee: open,
    Brunch: open && minutes < service.brunchEnd,
    Cocktails: open && dinnerDay && evening,
    Dinner: open && dinnerDay && evening,
  }
}

function nextOpening(from: Moment): { day: number; open: number } {
  for (let i = 1; i <= 7; i++) {
    const day = (from.day + i) % 7
    const open = week[day].open
    if (open !== null) return { day, open }
  }
  return { day: from.day, open: 0 }
}

const dayWord = (from: number, to: number) => (to === (from + 1) % 7 ? 'tomorrow' : week[to].name)

/** A one-line status, in plain words, for any moment. */
export function statusLine(m: Moment): { open: boolean; text: string } {
  const d = week[m.day]
  const dinnerDay = service.dinnerDays.includes(m.day)

  if (d.open === null || d.close === null) {
    const n = nextOpening(m)
    return { open: false, text: `Closed on ${d.name}s. Back ${dayWord(m.day, n.day)} at ${clock(n.open)}.` }
  }
  if (m.minutes < d.open) {
    return { open: false, text: `Opens at ${clock(d.open)} today.` }
  }
  if (m.minutes >= d.close) {
    const n = nextOpening(m)
    return { open: false, text: `Closed for the night. Back ${dayWord(m.day, n.day)} at ${clock(n.open)}.` }
  }
  if (m.minutes < service.brunchEnd) {
    const later = dinnerDay ? ' Dinner and cocktails tonight.' : m.day === service.roastDay ? ' Sunday roast today.' : ''
    return { open: true, text: `Open now until ${clock(d.close)}. Brunch until ${clock(service.brunchEnd)}.${later}` }
  }
  if (dinnerDay) {
    return { open: true, text: `Open now. Dinner and cocktails until ${clock(d.close)}.` }
  }
  return { open: true, text: `Open now until ${clock(d.close)}.` }
}

export const hoursText = (day: number) => {
  const d = week[day]
  return d.open === null || d.close === null ? 'Closed' : `${clock(d.open)} – ${clock(d.close)}`
}
