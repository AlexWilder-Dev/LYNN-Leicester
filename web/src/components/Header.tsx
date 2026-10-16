import { Link, NavLink } from 'react-router-dom'
import { info } from '../data/lynn'
import { LynnMark } from './LynnMark'
import { Pendants } from './Pendants'

export function Header() {
  return (
    <header className="header">
      <div className="wrap header__in" style={{ position: 'relative' }}>
        <Link to="/" className="header__mark" aria-label="LYNN, home">
          <LynnMark />
        </Link>
        <Pendants />
        <nav className="header__nav" aria-label="Main">
          <NavLink to="/menus">Menus</NavLink>
          <NavLink to="/visit">Visit</NavLink>
          <a className="btn header__book" href={info.bookingUrl} target="_blank" rel="noreferrer">
            Book a table
          </a>
        </nav>
      </div>
    </header>
  )
}
