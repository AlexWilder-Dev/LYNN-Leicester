import { Link, NavLink, useLocation } from 'react-router-dom'
import { info } from '../data/lynn'
import { useFasciaVisible } from '../lib/fascia'
import { LynnMark } from './LynnMark'

export function Header() {
  const fascia = useFasciaVisible()
  const { pathname } = useLocation()
  const signShowing = fascia && pathname === '/'

  return (
    <header className={`header${signShowing ? ' header--sign' : ''}`}>
      <div className="wrap header__in">
        <Link to="/" className="header__mark" aria-label="LYNN, home" tabIndex={signShowing ? -1 : 0}>
          <LynnMark />
        </Link>
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
