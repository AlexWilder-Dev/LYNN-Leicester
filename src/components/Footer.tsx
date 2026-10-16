import { Link } from 'react-router-dom'
import { info, week } from '../data/lynn'
import { hoursText } from '../lib/time'
import { LynnMark } from './LynnMark'

const order = [1, 2, 3, 4, 5, 6, 0]

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <LynnMark className="footer__mark" />
        <div className="footer__grid">
          <div>
            <h2>Find us</h2>
            <p>
              {info.address.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </p>
            <p style={{ marginTop: 10 }}>
              <a href={info.directionsUrl} target="_blank" rel="noreferrer">Directions</a>
            </p>
          </div>
          <div>
            <h2>Hours</h2>
            <p>
              {order.map((d) => (
                <span key={d}>
                  {week[d].short} {hoursText(d)}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div>
            <h2>Say hello</h2>
            <p>
              <a href={info.phoneHref}>{info.phoneDisplay}</a>
              <br />
              <a href={info.instagram.url} target="_blank" rel="noreferrer">{info.instagram.handle}</a>
              <br />
              <Link to="/menus">Menus</Link> · <a href={info.bookingUrl} target="_blank" rel="noreferrer">Book a table</a>
            </p>
          </div>
        </div>
        <p className="footer__credit">Site by AlexWilder-Dev</p>
      </div>
    </footer>
  )
}
