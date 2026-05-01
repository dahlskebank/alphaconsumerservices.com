# alphaconsumerservices.com

> *Alpha Consumer Services is a global consumer service development corporation. We provide whatever is lacking.*

Live: <https://alphaconsumerservices.com>

A long-running parody of a fictional luxury-services megacorp. Originally built in 2006 on WordPress + Bootstrap 3, with press releases spanning 2005–2012. This repo is a 2026 rebuild as a static Eleventy site — same design, same content, no PHP runtime.

## What's missing from this repo?

The Corporation does not distribute proprietary marketing assets or vendored typefaces. To run the site locally, reobtain them:

| Path | What | How |
|---|---|---|
| `src/assets/video/` | Two campaign clips (~38 MB) | Restore from local backup |
| `src/assets/fonts/lora/` | Lora woff/woff2 files | `npm i @fontsource/lora`, copy `node_modules/@fontsource/lora/files/lora-latin-{400,700}-{normal,italic}.{woff,woff2}` into the folder |
| `src/assets/fonts/oswald/` | Oswald woff/woff2 files | Same pattern with `@fontsource/oswald` |
| `src/assets/fonts/font-awesome/` | Font Awesome 4.7 CSS + font files | Download from the [Font Awesome 4.7 archive](https://fontawesome.com/v4/get-started) |

## Tech

- **Eleventy 3.1** — Nunjucks templates, static HTML output
- **Bootstrap 3 era** CSS — preserved verbatim from the original 2006 theme
- **jQuery 3.7 + Jasny offcanvas** — for the slide-out side menu
- **PhotoSwipe 5** — image lightbox
- **Custom AJAX nav** — replaces the WordPress Ajaxify plugin with a partial-swap pattern that syncs `#main` content + `#page` wrapper classes
- **Vanilla everything else** — no build step beyond `eleventy`

## Build

```bash
npm install
npm run build     # eleventy → _site/
npm start         # eleventy --serve, watches src/ for changes
```

The author serves the build from Laragon locally with the hosts file mapping `alphaconsumerservices.com` → `127.0.0.1`, so the project runs at its real domain in development.

## Notable conversion choices (2006 → 2026)

- WordPress + PHP runtime → static Eleventy output
- `?id=XXX` query-string routing → clean URLs
- Ajaxify plugin → custom `ajax-nav.js` (PJAX-style partial nav)
- Contact Form 7 → static "form temporarily unavailable" notice
- Cookies → `localStorage` (theme/contrast preference, cookie-notice acknowledgement)
- Google Fonts CDN → vendored `@fontsource` files
- Original lightbox → PhotoSwipe 5
- ISO-8859-1 → UTF-8
- nanoscroller, jQuery UI, Ajaxify all dropped; jQuery upgraded 2.1 → 3.7

## License

[WTFPL](http://www.wtfpl.net/) — Do What The Fuck You Want To Public License.
