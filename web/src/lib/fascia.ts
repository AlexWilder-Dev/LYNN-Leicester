import { useSyncExternalStore } from 'react'

// Whether the big LYNN sign at the top of the home page is in view. While it is,
// the header leaves its own small mark out so the logo only appears once.
let visible = false
const listeners = new Set<() => void>()

export function setFasciaVisible(next: boolean) {
  if (next === visible) return
  visible = next
  listeners.forEach((l) => l())
}

export function useFasciaVisible() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => {
        listeners.delete(l)
      }
    },
    () => visible,
  )
}
