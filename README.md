# alphaconsumerservices.com

> *They'll provide what is lacking. They provide everything.*

Live: <https://alphaconsumerservices.com>

The website of Alpha Consumer Services — a fictional luxury-services megacorp from the [Killing Heat](https://killingheat.com/) film universe, where protagonists Gordon Goldman and John Walker draw their paychecks. First built in 2010 as PHP fetching static HTML; rebuilt in 2015 on WordPress with a custom Bootstrap 3 theme; rebuilt again in 2026 as this static Eleventy site — same content, no PHP runtime, no WordPress to maintain. Much of the in-universe copy (Site Terms, Privacy Policy, FAQ) was hand-typed by Kenny Wang long before LLMs existed.

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
- **Bootstrap 3 era** CSS — preserved verbatim from the 2015 WordPress theme
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

## Notable conversion choices (2015 WordPress → 2026 Eleventy)

The 2015 WordPress site was first scraped to static HTML with [HTTrack](https://www.httrack.com/) to retire the database and PHP runtime. That HTML was then rebuilt as Eleventy templates with the dynamic bits replaced:

- WordPress + PHP runtime → static Eleventy output (Nunjucks)
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
