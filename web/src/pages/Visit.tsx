import { info, photos, quotes, week } from '../data/lynn'
import { Figure, Quote } from '../components/Bits'
import { hoursText, leicesterNow, statusLine } from '../lib/time'
import { useLight } from '../lib/light'

const order = [1, 2, 3, 4, 5, 6, 0]

export function Visit() {
  useLight()
  const now = leicesterNow()
  const s = statusLine(now)

  return (
    <div className="wrap" style={{ paddingBottom: 56 }}>
      <header style={{ padding: '30px 0 22px' }}>
        <p className="kicker">Visit</p>
        <h1 className="address">
          14 St Martins
          <br />
          Square
        </h1>
        <p className="lede" style={{ marginTop: 14 }}>Leicester LE1 5DF</p>
      </header>

      <div className="split">
        <div>
          <Figure photo={photos.windowNight} caption="Look for the brushed Lynn over the door." />
          <div className="btn-row">
            <a className="btn btn--solid" href={info.directionsUrl} target="_blank" rel="noreferrer">
              Directions
            </a>
            <a className="btn" href={info.mapsUrl} target="_blank" rel="noreferrer">
              Google Maps
            </a>
          </div>
        </div>

        <div>
          <div className="status" style={{ paddingTop: 0 }}>
            <span className={`status__dot${s.open ? ' status__dot--open' : ''}`} aria-hidden="true" />
            <p className="status__text">{s.text}</p>
          </div>
          <table className="hours" style={{ marginTop: 10 }}>
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {order.map((d) => (
                <tr key={d} aria-current={d === now.day ? 'date' : undefined}>
                  <th scope="row">{week[d].name}</th>
                  <td>{hoursText(d)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="facts">
            <li>
              <strong>Brunch</strong>
              From opening until 15:00, every day but Tuesday. Walk in.
            </li>
            <li>
              <strong>Dinner &amp; cocktails</strong>
              Friday and Saturday evenings, until 21:30. Book ahead.
            </li>
            <li>
              <strong>Sunday roast</strong>
              Sundays. Book your table.
            </li>
            <li>
              <strong>Christmas menu</strong>
              25 November – 24 December, by booking. Parties big and small.
            </li>
            <li>
              <strong>Call</strong>
              <a href={info.phoneHref}>{info.phoneDisplay}</a>
            </li>
            <li>
              <strong>Instagram</strong>
              <a href={info.instagram.url} target="_blank" rel="noreferrer">{info.instagram.handle}</a>
            </li>
          </ul>
          <div className="btn-row">
            <a className="btn btn--solid" href={info.bookingUrl} target="_blank" rel="noreferrer">
              Book a table
            </a>
            <a className="btn" href={info.phoneHref}>
              Call
            </a>
          </div>
          <Quote text={quotes.belavieIykyk.text} who={quotes.belavieIykyk.who} />
        </div>
      </div>
    </div>
  )
}
