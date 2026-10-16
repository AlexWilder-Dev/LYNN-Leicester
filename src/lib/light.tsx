import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isNight, leicesterNow, type Moment } from './time'

// The site's light follows the time at LYNN: pale like the blush walls by day,
// down to ink and filament amber in the evening. The window clock can move it.
type Light = {
  moment: Moment
  live: boolean
  night: boolean
  setMoment: (m: Moment) => void
  backToNow: () => void
}

const LightContext = createContext<Light | null>(null)

export function LightProvider({ children }: { children: ReactNode }) {
  const [moment, setMomentState] = useState<Moment>(() => leicesterNow())
  const [live, setLive] = useState(true)

  useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => setMomentState(leicesterNow()), 30_000)
    return () => window.clearInterval(id)
  }, [live])

  const setMoment = useCallback((m: Moment) => {
    setLive(false)
    setMomentState(m)
  }, [])

  const backToNow = useCallback(() => {
    setLive(true)
    setMomentState(leicesterNow())
  }, [])

  const night = isNight(moment)

  useEffect(() => {
    document.documentElement.dataset.light = night ? 'night' : 'day'
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', night ? '#12110E' : '#F5F1EA')
  }, [night])

  const value = useMemo(() => ({ moment, live, night, setMoment, backToNow }), [moment, live, night, setMoment, backToNow])
  return <LightContext.Provider value={value}>{children}</LightContext.Provider>
}

export function useLight() {
  const ctx = useContext(LightContext)
  if (!ctx) throw new Error('useLight outside LightProvider')
  return ctx
}
