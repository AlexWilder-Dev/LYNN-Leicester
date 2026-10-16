# LYNN — demo site

A speculative website for **LYNN**, 14 St Martins Square, Leicester: coffee and brunch by day, dinner and cocktails on Friday and Saturday nights, a roast on Sundays.

It's a front-end demo built on static data, with no CMS, bookings or payments. The Book buttons go to LYNN's existing table booking on Google.

Live: https://alexwilder-dev.github.io/lynn-leicester/

## What's in it

- **The window.** LYNN's front window has COFFEE / BRUNCH / COCKTAILS / DINNER on the glass. Here those words light up for the actual time in Leicester. You can drag the clock on the sill, or tap a word, to run through the week. When evening comes the site goes dark and the globe lights come on.
- **The counter.** The owner's photo of the cannoli cabinet. Tap a flavour card and the photo slides to that tray.
- **Menus.** Brunch, counter, dinner, Sunday, Christmas and drinks, all as readable text.
- **Visit.** Hours with today highlighted, directions, phone and booking. On phones there's a bar along the bottom with Call, Directions and Book.

## Where things live

- `src/data/lynn.ts`: menus, prices, hours, contact, quotes and photo credits. It's the only file that needs editing when something changes.
- `research/`: notes on LYNN (`notes.md`), their logo, and the source photos.
- `public/photos/`: web-sized copies of LYNN's own photos, made by `npm run photos`.
- `public/og.jpg`: the 1200×630 link-preview image, made by `npm run og`.
- `public/favicon*`, `public/apple-touch-icon.png`: made from the wordmark by `npm run icons`.

## Run it

```sh
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the build at /lynn-leicester/
```

Vite + React + TypeScript + Framer Motion, HashRouter, base path `/lynn-leicester/`. Pushing to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`; in the repo settings, set Pages → Source to "GitHub Actions".

Site by AlexWilder-Dev.
