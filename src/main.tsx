import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from './App'
import { LightProvider } from './lib/light'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LightProvider>
        <App />
      </LightProvider>
    </HashRouter>
  </StrictMode>,
)
