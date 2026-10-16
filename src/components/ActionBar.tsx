import { info } from '../data/lynn'
import { useLight } from '../lib/light'
import { leicesterNow, statusLine } from '../lib/time'

// Phone-only bar: the three things people look a café up for.
export function ActionBar() {
  useLight() // re-render as the clock moves
  const now = statusLine(leicesterNow())
  return (
    <nav className="actionbar" aria-label="Quick actions">
      <a href={info.phoneHref}>
        Call
        <small>{info.phoneDisplay}</small>
      </a>
      <a href={info.directionsUrl} target="_blank" rel="noreferrer">
        Directions
        <small>{now.open ? 'Open now' : 'St Martins Sq'}</small>
      </a>
      <a href={info.bookingUrl} target="_blank" rel="noreferrer">
        Book
        <small>Dinner &amp; Sundays</small>
      </a>
    </nav>
  )
}
