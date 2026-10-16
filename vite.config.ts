import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this branch's root, so the build lands there.
// web/index.html is the source page; asset paths are relative so the site
// works wherever Pages puts it (HashRouter keeps every route on index.html).
export default defineConfig({
  root: 'web',
  base: './',
  publicDir: '../public',
  build: {
    outDir: '..',
    emptyOutDir: false,
  },
  plugins: [react()],
})
