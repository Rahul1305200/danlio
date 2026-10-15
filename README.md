# DANLIO Garage Door Repair — new pages

Four new pages built to match the existing design system at
[danliogaragedoor.com](https://danliogaragedoor.com/).

## Pages

| Page | File |
| --- | --- |
| Broken spring repair | `garage-door-spring-repair-broward.html` |
| Off-track door repair | `off-track-garage-door-repair-broward.html` |
| Garage door opener repair | `garage-door-opener-repair-broward.html` |
| Garage door repair Hollywood FL | `garage-door-repair-hollywood-fl.html` |

`index.html` is a preview index and is marked `noindex`.

## Assets

- `assets/danlio.css` — global stylesheet. Every value was measured from the
  live site at a 1920px viewport; the reference table is at the top of the file.
- `assets/danlio-icons.css` — the site's own Font Awesome 5 glyphs, applied as
  CSS masks so they inherit `currentColor`.
- `assets/danlio.js` — mobile menu, FAQ accordion, form confirmation.

## Design tokens (measured from the live site)

| Token | Value |
| --- | --- |
| Container | 1240px (10px gutter on the outer wrapper) |
| H1 | Roboto 76 / 700 / 83.6 |
| H2 | Roboto 50 / 600 / 60 |
| Card title | Roboto 28 / 600 / 33.6 |
| Body | Inter 16 / 24 |
| Buttons | Inter 20 / 500 / uppercase, radius 3px |
| Navy | `#1F3A68` · Deep navy `#062F63` · Red `#D32F2F` |
| Section padding | 80px top / 80px bottom |
| Hero padding | 80px top / 150px bottom |

## Before going live

- The request form is front-end only. Wire it to the existing Elementor Pro
  form action so submissions reach the same inbox as the homepage form.
- Images are hot-linked from the live site. Move them into the Media Library
  if these pages are rebuilt in WordPress.
- Still needed from the client: license number, street address, business
  hours, years in business, and a real review count.
