import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { info, menus, photos, quotes, voice } from '../data/lynn'
import { Figure, MenuGroups, Quote } from '../components/Bits'

export function Menus() {
  const [params, setParams] = useSearchParams()
  const id = menus.some((m) => m.id === params.get('m')) ? params.get('m')! : 'brunch'
  const menu = menus.find((m) => m.id === id)!
  const bookable = id === 'dinner' || id === 'sunday' || id === 'christmas'
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const tab = listRef.current?.querySelector<HTMLElement>(`#tab-${id}`)
    const list = listRef.current
    if (tab && list) list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2, behavior: 'smooth' })
  }, [id])

  return (
    <div className="wrap">
      <header style={{ padding: '30px 0 18px' }}>
        <p className="kicker">LYNN · 14 St Martins Square</p>
        <h1 className="display section__title">Menus</h1>
      </header>

      <div className="tabs">
        <ul className="tabs__list" role="tablist" aria-label="Menus" ref={listRef}>
          {menus.map((m) => (
            <li key={m.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`tab-${m.id}`}
                aria-selected={m.id === id}
                aria-controls="menu-panel"
                className="tabs__btn"
                onClick={() => setParams({ m: m.id }, { replace: true })}
              >
                {m.label}
                {m.id === id && <motion.span layoutId="tab-bar" className="tabs__bar" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={id}
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`tab-${id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          style={{ paddingBottom: 56 }}
        >
          <div className="menu-head">
            <p className="menu-head__when">{menu.when}</p>
            {menu.id === 'christmas' && menu.intro && (
              <p className="price-banner">
                {menu.intro.split(' · ').map((part) => (
                  <span key={part} style={{ display: 'block' }}>{part}</span>
                ))}
              </p>
            )}
            {menu.id !== 'christmas' && menu.intro && <p className="menu-head__intro">{menu.intro}</p>}
          </div>

          {menu.id === 'sunday' ? (
            <div className="split">
              <Figure photo={photos.roast} tall />
              <div>
                <h2 className="display" style={{ fontSize: 'clamp(36px, 11vw, 72px)' }}>{voice.sunday}</h2>
                <p className="lede" style={{ marginTop: 16 }}>{voice.sundayMore}</p>
                <Quote text={quotes.sunday.text} who={quotes.sunday.who} />
              </div>
            </div>
          ) : (
            <MenuGroups groups={menu.groups} />
          )}

          {menu.id === 'christmas' && <p className="muted" style={{ marginTop: 6 }}>{voice.parties}</p>}

          {bookable && (
            <div className="btn-row">
              <a className="btn btn--solid" href={info.bookingUrl} target="_blank" rel="noreferrer">
                Book a table
              </a>
              <a className="btn" href={info.phoneHref}>
                Call {info.phoneDisplay}
              </a>
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  )
}
