import { Link } from 'react-router-dom'
import type { Word } from '../data/lynn'
import { useLight } from '../lib/light'
import { isOpen, litWords } from '../lib/time'

// The menu in the window: everything LYNN does, one line each, linked to its menu.
// Rows light up in step with the window words.
type Row = { title: string; detail: string; to: string; word?: Word; sunday?: boolean }

const rows: Row[] = [
  { title: 'Coffee & the counter', detail: 'Cannoli, pastries, toasties, focaccia, matcha', to: '/menus?m=counter', word: 'Coffee' },
  { title: 'Brunch', detail: 'Until 15:00, every day but Tuesday. Walk in.', to: '/menus?m=brunch', word: 'Brunch' },
  { title: 'Cocktails', detail: '£10 each. Wine, beer and spirits too.', to: '/menus?m=drinks', word: 'Cocktails' },
  { title: 'Dinner', detail: 'Friday & Saturday, until 21:30. Book ahead.', to: '/menus?m=dinner', word: 'Dinner' },
  { title: 'Sunday roast', detail: 'Sundays. Book your table.', to: '/menus?m=sunday', sunday: true },
  { title: 'Christmas', detail: '25 Nov – 24 Dec. 2 courses £30, 3 courses £35.', to: '/menus?m=christmas' },
]

export function WhatsOn() {
  const { moment } = useLight()
  const lit = litWords(moment)
  const sundayOn = moment.day === 0 && isOpen(moment)

  return (
    <nav className="whatson" aria-label="What LYNN serves">
      <ul>
        {rows.map((r) => {
          const on = r.word ? lit[r.word] : r.sunday ? sundayOn : false
          return (
            <li key={r.title}>
              <Link to={r.to} className={`whatson__row${on ? ' is-on' : ''}`}>
                <span className="whatson__title">
                  {r.title}
                  {on && <span className="whatson__on">On</span>}
                </span>
                <span className="whatson__detail">{r.detail}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
