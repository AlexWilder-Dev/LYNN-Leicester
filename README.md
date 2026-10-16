# LYNN — demo site

A speculative website for **LYNN**, 14 St Martins Square, Leicester: coffee and brunch by day, dinner and cocktails on Friday and Saturday nights, a roast on Sundays.

It's a front-end demo built on static data, with no CMS, bookings or payments. The Book buttons go to LYNN's existing table booking on Google.

Live: https://alexwilder-dev.github.io/LYNN-Leicester/

## What's in it

- **The window.** LYNN's front window has COFFEE / BRUNCH / COCKTAILS / DINNER on the glass. Here those words light up for the actual time in Leicester. You can drag the clock on the sill, or tap a word, to run through the week. When evening comes the site goes dark and the globe lights come on.
- **The counter.** The owner's photo of the cannoli cabinet. Tap a flavour card and the photo slides to that tray.
- **Menus.** Brunch, counter, dinner, Sunday, Christmas and drinks, all as readable text.
- **Visit.** Hours with today highlighted, directions, phone and booking. On phones there's a bar along the bottom with Call, Directions and Book.

## Where things live

- `web/src/data/lynn.ts`: menus, prices, hours, contact, quotes and photo credits. It's the only file that needs editing when something changes.
- `web/`: the app source (`index.html` and `src/`).
- `research/`: notes on LYNN (`notes.md`), their logo, and the source photos.
- `public/photos/`: web-sized copies of LYNN's own photos, made by `npm run photos`.
- `public/og.jpg`: the 1200×630 link-preview image, made by `npm run og`.
- `public/favicon*`, `public/apple-touch-icon.png`: made from the wordmark by `npm run icons`.

## Run it

```sh
npm install
npm run dev       # local dev server
npm run build     # builds into the repo root (index.html, assets/, photos/, og.jpg, icons)
npm run preview   # serve the build locally
```

Vite + React + TypeScript + Framer Motion, HashRouter, relative asset paths. GitHub Pages deploys this branch from the root. After changing anything, run `npm run build` and commit the root output along with the source; Pages picks it up on push. The link-preview tags in `web/index.html` use the absolute live URL. If the repo is renamed, update them too.

Site by AlexWilder-Dev.
