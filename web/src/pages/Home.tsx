import { Link } from 'react-router-dom'
import { info, photos, quotes, voice, week } from '../data/lynn'
import { Window, WindowStatus } from '../components/Window'
import { Counter } from '../components/Counter'
import { ABoard, Figure, Quote, Reveal } from '../components/Bits'
import { hoursText, leicesterNow } from '../lib/time'

const plates = [
  { photo: photos.porkBelly, name: 'Braised pork belly', sub: 'Small plate' },
  { photo: photos.carrots, name: 'BBQ carrots', sub: 'Small plate' },
  { photo: photos.prawns, name: 'Sautéed prawns', sub: 'Small plate' },
  { photo: photos.pass, name: 'Dinner', sub: 'From the open kitchen' },
  { photo: photos.starter, name: 'To start', sub: 'Starter plate' },
  { photo: photos.wings, name: 'Dinner', sub: 'From the open kitchen' },
]

export function Home() {
  const today = leicesterNow().day

  return (
    <>
      <div className="wrap hero">
        <Window />
        <div className="hero__side">
          <WindowStatus />
          <section className="intro">
            <p className="intro__big">
              Coffee and brunch every day but Tuesday. <em>Dinner and cocktails</em> on Friday and Saturday nights. A
              proper roast on Sundays.
            </p>
            <Quote text={quotes.visitLeicester.text} who={quotes.visitLeicester.who} />
          </section>
        </div>
      </div>

      <section className="section section--plaster" id="counter">
        <div className="wrap split split--wide-left">
          <div>
            <p className="kicker">The counter</p>
            <h2 className="display section__title">
              Cannoli
              <small>Tap a card, look closer</small>
            </h2>
            <p className="lede">
              The glass cabinet on the counter: zabaglione, hazelnut, lemon, pistachio and salted caramel, filled
              and lined up in trays. Croissants, pastries, arancini, sausage rolls and toasties alongside.
            </p>
            <Quote text={quotes.belavieCannoli.text} who={quotes.belavieCannoli.who} />
          </div>
          <div className="counter-media">
            <Counter />
          </div>
        </div>
      </section>

      <section className="section" id="day">
        <div className="wrap">
          <div className="section__head">
            <p className="kicker">By day</p>
            <h2 className="display section__title">
              Brunch
              <small>Until 15:00 · walk in</small>
            </h2>
          </div>
          <div className="split">
            <div>
              <p className="lede">
                Smashed avocado on toasted sourdough with a poached egg and hollandaise. Eggs Benedict, with smoked
                salmon if you like. Scrambled tofu with tomatoes. Hummus and roasted vegetables. Loaded hash browns,
                breakfast rolls, and focaccia sandwiches made on our own focaccia.
              </p>
              <Quote text={quotes.avo.text} who={quotes.avo.who} />
              <div className="btn-row">
                <Link className="btn btn--solid" to="/menus?m=brunch">
                  Brunch menu
                </Link>
                <Link className="btn" to="/menus?m=counter">
                  Counter &amp; coffee
                </Link>
              </div>
            </div>
            <Reveal>
              <Figure photo={photos.caprese} caption={voice.caprese} tall />
            </Reveal>
          </div>

          <div className="split" style={{ marginTop: 48 }}>
            <Reveal>
              <Figure photo={photos.matchaSquare} caption="Iced strawberry matcha, out on the square." tall />
            </Reveal>
            <div>
              <h3 className="display" style={{ fontSize: 'clamp(34px, 10vw, 64px)' }}>Matcha, hot or iced</h3>
              <p className="lede" style={{ marginTop: 14 }}>
                {voice.matcha} Herbal teas too, for when the square turns cold.
              </p>
              <div style={{ marginTop: 26 }}>
                <ABoard caption="On the board outside this October." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--plaster" id="night">
        <div className="wrap">
          <div className="section__head">
            <p className="kicker">By night</p>
            <h2 className="display section__title">
              Dinner
              <small>Friday &amp; Saturday · until 21:30</small>
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Small plates and larger plates, cooked in the open kitchen and brought over by the chefs who made them.
              {' '}{voice.starters}
            </p>
          </div>
          <div className="plates" role="list" aria-label="Plates from recent dinners">
            {plates.map((pl) => (
              <figure role="listitem" key={pl.photo.src}>
                <img src={pl.photo.src} alt={pl.photo.alt} width={pl.photo.w} height={pl.photo.h} loading="lazy" />
                <figcaption>
                  {pl.name}
                  <span>{pl.sub}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="split" style={{ marginTop: 30 }}>
            <div>
              <Quote text={quotes.openKitchen.text} who={quotes.openKitchen.who} />
            </div>
            <div>
              <p className="lede" style={{ margin: 0 }}>
                Cocktails are £10: honey daiquiri, raspberry &amp; lime mojito, Aperol spritz, passionfruit margarita,
                limoncello spritz, praline espresso martini. {voice.bookNow}
              </p>
              <div className="btn-row">
                <a className="btn btn--solid" href={info.bookingUrl} target="_blank" rel="noreferrer">
                  Book dinner
                </a>
                <Link className="btn" to="/menus?m=dinner">
                  Dinner &amp; drinks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="sunday">
        <div className="wrap split">
          <Reveal>
            <Figure photo={photos.roast} tall />
          </Reveal>
          <div>
            <p className="kicker">Sundays</p>
            <h2 className="display section__title">
              {voice.sunday}
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Crispy roasties, golden Yorkshire puddings, tender meat, lashings of gravy and all the trimmings. {voice.sundayMore}
            </p>
            <Quote text={quotes.sunday.text} who={quotes.sunday.who} />
            <div className="btn-row">
              <a className="btn btn--solid" href={info.bookingUrl} target="_blank" rel="noreferrer">
                Book Sunday
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--plaster" id="christmas">
        <div className="wrap">
          <div className="xmas">
            <p className="xmas__dates">25 November – 24 December</p>
            <h2 className="display section__title" style={{ marginBottom: 14 }}>
              Christmas at LYNN
            </h2>
            <p className="xmas__price"><span>2 courses £30</span><span>3 courses £35</span></p>
            <p className="xmas__dishes">
              Brie &amp; cranberry croquettes, herb-roasted turkey with pigs in blankets, tandoori cauliflower, duo of
              lamb, Christmas pudding parfait. {voice.parties}
            </p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <Link className="btn btn--solid" to="/menus?m=christmas">
                Christmas menu
              </Link>
              <a className="btn" href={info.bookingUrl} target="_blank" rel="noreferrer">
                Book
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="find">
        <div className="wrap split">
          <div>
            <p className="kicker">Find us</p>
            <p className="address">
              14 St Martins
              <br />
              Square
            </p>
            <p className="lede" style={{ marginTop: 14 }}>
              Leicester LE1 5DF. Look for the brushed <em>Lynn</em> over the door.
            </p>
            <div className="btn-row">
              <a className="btn btn--solid" href={info.directionsUrl} target="_blank" rel="noreferrer">
                Directions
              </a>
              <Link className="btn" to="/visit">
                Hours &amp; contact
              </Link>
            </div>
          </div>
          <div>
            <ul className="facts">
              <li>
                <strong>Today, {week[today].name}</strong>
                {hoursText(today)}
              </li>
              <li>
                <strong>Brunch</strong>
                Walk in, and come early at weekends.
              </li>
              <li>
                <strong>Dinner, Sundays, Christmas</strong>
                Book ahead, or call <a href={info.phoneHref}>{info.phoneDisplay}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
