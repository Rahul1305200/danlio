# DANLIO Garage Door Repair — Design System & Build Spec

Handoff document for building the two remaining pages.

- **Live preview of the four completed pages:** https://rahul1305200.github.io/Danilo-Garage-Door-Repair/
- **Repo:** https://github.com/Rahul1305200/Danilo-Garage-Door-Repair
- **Client site the system was derived from:** https://danliogaragedoor.com/

Every value in Part 1 was **measured from the live client site** at a 1920px
viewport, not chosen. Do not change these without a reason — the four built
pages match the client's existing site exactly on these tokens.

> **Scope note:** everything here is **desktop-only**. The responsive pass has
> not been done. Mobile breakpoints in `danlio.css` still carry pre-refinement
> spacing, and the newer components (hero form, review carousel, problem grid,
> county cards, why-choose grid) have **no mobile rules yet**.

---

## Part 1 — Design tokens

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--navy` | `#1F3A68` | Section bands, badge bar, service areas |
| `--navy-deep` | `#062F63` | Headings, top bar, footer, brands band, icon chips |
| `--red` | `#D32F2F` | Primary CTA only, icon chips on problem tiles, FAQ +/− |
| `--ink` | `#414141` | Body text |
| `--black` | `#000` | Card titles (h3) |
| `--line` | `#E3E8F0` | Borders, dividers |
| `--bg-soft` | `#F5F7FA` | Light bands (why-choose, reviews) |
| `--white` | `#fff` | Cards, header |

Not in the palette, do not introduce: the client site has a stray link colour
`#CC3366` (a theme default). It was deliberately dropped.

### Type

Two families only. Load from Google Fonts.

| Element | Font | Size | Weight | Line height |
| --- | --- | --- | --- | --- |
| `h1` | Roboto | 76px | 700 | 83.6px |
| `h1` (hero with form) | Roboto | 58px | 700 | 66px |
| `h2` | Roboto | 50px | 600 | 60px |
| `h2` (review bar) | Roboto | 34px | 600 | 42px |
| `h3` card title | Roboto | 28px | 600 | 33.6px |
| `h4` / small title | Roboto | 23px | 600 | 27.6px |
| Body | Inter | 16px | 400 | 24px |
| Lead / intro | Inter | 18px | 400 | 27px |
| Hero subhead | Inter | 22px | 400 | 33px |
| Nav link | Roboto | 18px | 500 | 20px, **UPPERCASE** |
| Button | Inter | 20px | 500 | 20px, **UPPERCASE** |
| Top bar | Inter | 16px | 400 | 24px |

Manrope, Roboto Slab and Playfair are loaded on the client's site but unused —
do not use them.

### Spacing

8px scale. Use the tokens, not arbitrary values.

```
--s1 4    --s2 8    --s3 16   --s4 24   --s5 32
--s6 48   --s7 64   --s8 80   --s9 120
```

| Context | Value |
| --- | --- |
| Section padding (top/bottom) | `80px` (`--s8`) |
| Section heading → content | `48px` (`--s6`) |
| Card padding | `32px` (`--s5`) |
| Card grid gap | `24px` (`--s4`) |
| Split section gap | `64px` (`--s7`) |
| Checklist row gap | `16px` (`--s3`) |
| Hero padding | `80px` top / `80px` bottom |

> The client site uses `80 / 150` on the hero. That left a dead band of photo on
> our longer pages, so it was balanced to `80 / 80`. This is the one intentional
> deviation from the measured values.

### Layout

| | Value |
| --- | --- |
| Container | `1240px` max-width, **no horizontal padding** |
| Gutter | `10px`, applied to the **full-width section wrapper**, not the container |
| Top bar height | `44px` (10px padding on `.wrap`) |
| Header height | `111px` (10px padding on `.wrap`, logo 274×91) |

Getting this wrong is the most common mistake: the 10px lives on the outer
section, the 1240 box inside has none. At 1920px viewport, content starts at
**x = 332**.

### Shape & motion

- Border radius: `3px` buttons · `4px` inputs, arrows, small tiles · `6px` cards, icon chips
- Hover on cards: `translateY(-3px)` + `border-color: var(--navy)` + `0 10px 30px rgba(16,34,66,.10)`
- Transitions: `.18s ease`

---

## Part 2 — Components

All live in `assets/danlio.css`. Reuse, do not re-invent.

### Page shell (identical on every page)

```
.topbar          phone left, service areas right
.site-header     logo left, UPPERCASE nav right. No phone, no button.
.hero            full-bleed photo + .hero__bg overlay
.badgebar        navy strip, 4 items, centred with dividers
  … page sections …
.site-footer     3 columns
.wa-float        fixed WhatsApp button, bottom right
.mobilebar       sticky call bar (mobile only)
```

**Header rule:** the client's header has *no* phone number and *no* button.
Don't add them — this was corrected once already.

### Section wrappers

| Class | Background |
| --- | --- |
| `.sec` | white (default), 80px padding |
| `.sec.sec--navy` | `--navy` |
| `.sec.sec--deep` | `--navy-deep` |
| `.sec.whychoose` | `--bg-soft` + hairline top/bottom |
| `.sec.sec--reviews` | `--bg-soft` |
| `.sec.areas` | `--navy` |
| `.sec.brands` | `--navy-deep` |

**Never place two same-coloured bands back to back** — they merge into one slab.
Rhythm should alternate, e.g. navy → light → white → navy.

### Content blocks

| Class | What it is |
| --- | --- |
| `.hero--form` + `.heroform` | Two-column hero, copy left, lead form right |
| `.cards.c2/.c3/.c4` + `.card` | Standard card grid, `.ico` icon tile inside |
| `.split` / `.split--flip` | Image + text, 50/50, 64px gap |
| `.checks` / `.checks.two` | Tick list, 1 or 2 columns |
| `.problemgrid` + `.problem` | 4×2 grid of linked problem tiles, red icon chip |
| `.steps` + `.step` | 3-step process, connector line through the numbers |
| `.warr` | 3 warranty tiles |
| `.whygrid` + `.whycard` | 3×2 benefit cards with navy icon chip |
| `.brandgrid` + `.brandtrust` | Brand tiles + 3 supporting points |
| `.countygrid` + `.county` | Service areas grouped by county |
| `.revbar` + `.revcar` + `.reviewcard` | Review carousel with arrow controls |
| `.related` | 3 cross-link cards |
| `.faq` + `details.q` | Accordion |
| `.ctaband` | Full-width navy CTA |
| `.formbox` | Standalone form |

### CTA hierarchy

Do not repeat the same red button seven times.

1. **Primary** `.btn.btn--call` — red, the phone call
2. **Secondary** `.btn.btn--outline` or `.btn--ghost` — the form
3. **Tertiary** `.linkcta` — inline text link with arrow

Support with `.ctanote` micro-copy, e.g.
*"Free estimates • No obligation • Arrival in 30–90 minutes"*.

### Icons

Font Awesome 5 Free, applied as CSS masks so they inherit `currentColor`.
Markup is always `<i class="ic ic-name"></i>`. **No `<svg>` in the HTML, no icon
font, no CDN.**

Available:

```
alert  arrow-right  ban  bolt  building  calendar  check  clock  door
handshake  link  menu  mobile  money  phone  pin  plug  quote  shield
signal  sliders  star  tension  tools  truck  user-check  volume
whatsapp  wrench
```

To add one: take the path data from `@fortawesome/fontawesome-free@5.15.4`
and follow the existing pattern in `assets/danlio-icons.css`. Don't hand-draw.

Give every card in a grid a **distinct** icon — repeating one across two cards
in the same row was flagged as a defect.

### Form

- Native `<select>` stays in the DOM for accessibility and submission; JS mirrors
  it into `.selectwrap` for styling. Don't replace it with a div.
- **The form does not submit anywhere.** It shows a front-end confirmation only.
  On the live WordPress site it must be wired to the existing Elementor Pro form
  action so leads reach the same inbox as the homepage form.

### Dead classes — ignore or delete

Left over from iteration, not used by any page:
`.areas-grid` `.pills` `.brandstrip` `.ratingcard` `.whylist` `.ctarow`
`.sec--tight` `.sec--btm`

---

## Part 3 — Page conventions

### Files & URLs

Flat, keyword-first, no `/services/` nesting.

| Page | File |
| --- | --- |
| Broken spring repair | `garage-door-spring-repair-broward.html` |
| Off-track door repair | `off-track-garage-door-repair-broward.html` |
| Opener repair | `garage-door-opener-repair-broward.html` |
| Hollywood, FL | `garage-door-repair-hollywood-fl.html` |

### Required in `<head>` on every page

- `<title>` and `<meta name="description">`
- `<link rel="canonical">` → the final `danliogaragedoor.com` URL
  **Remove the canonical when the pages go live on their own domain**, or the
  live versions will point away from themselves.
- Open Graph (6 tags) + Twitter card (4 tags)
- JSON-LD `@graph`: `LocalBusiness` (with `aggregateRating` 5.0 / 91) +
  `Service` + `BreadcrumbList` + `FAQPage`

### Required in `<body>`

- One `<h1>` only, keyword-led
- `<main>` landmark; sections use `aria-labelledby`
- `<strong>` on the primary keyword in the hero paragraph
- A **Related Services** block linking the other pages
- The WhatsApp float: `https://wa.me/19547701344`

> **Dark-background gotcha:** the base rule paints `<strong>` navy. On any dark
> band you must include it in the override list or the text disappears. This
> bug shipped once.

### Section order that works (proven on the four built pages)

```
1  Top bar
2  Header
3  Hero (+ lead form)
4  Badge bar
5  Page-specific: signs / problems / what we do
6  Common Garage Door Problems We Fix   (problem grid)
7  Garage Door Safety                    (split)
8  Page-specific deep dive
9  Costs
10 How Our Service Works
11 Our Warranty
12 Recent Google reviews                 (carousel)
13 CTA band
14 Common Questions                      (FAQ)
15 Service Areas                         (county grid)
16 Related Services
17 Footer
```

---

## Part 4 — The two pages to build

### Page 5 — New Garage Door Installation

- **File:** `new-garage-door-installation-broward.html`
- **URL:** `/new-garage-door-installation-broward/`
- **H1:** New Garage Door Installation in Broward County
- **Target query:** "new garage door installation broward / fort lauderdale"

**Content that exists (verbatim from the client site — use as-is):**

> "Upgrade your home with a brand new garage door. We provide professional
> installation with durable materials and modern styles."

> "We install reinforcement struts or replace older garage doors to help meet
> Florida hurricane wind-load requirements."
> · Reinforcement struts installed
> · Wind-load reinforcement for older doors
> · Hurricane-rated door replacements available

**Suggested sections:** hero + form · badge bar · why replace vs repair ·
door styles & materials *(needs client)* · **hurricane-rated upgrade** (the
strongest angle in South Florida — give it a feature band) · installation
process · costs · warranty · reviews · FAQ · service areas · related.

> This page cannot be finished from published material. It is two sentences of
> source copy. **Do not invent door brands, materials or wind ratings.**

### Page 6 — Annual Maintenance Plan

- **File:** `garage-door-maintenance-plan-broward.html`
- **URL:** `/garage-door-maintenance-plan-broward/`
- **H1:** Annual Garage Door Maintenance Plan in Broward County
- **Target query:** "garage door maintenance / tune-up broward"

**Content that exists (verbatim — the best-covered of the two):**

> "Annual Garage Door Maintenance Plan – Only $149"
> · Full safety inspection
> · Hurricane code inspection
> · Balance & alignment check
> · Lubrication of moving parts
> · Opener & sensor inspection
> · Minor adjustments & tightening

**Suggested sections:** hero + form · badge bar · what's included (6 cards,
one per inclusion) · why maintenance matters *(ground in the existing safety
copy)* · what $149 covers · process · warranty · reviews · FAQ · service
areas · related.

---

## Part 5 — Content sources, in priority order

1. **The client's live site** — `danliogaragedoor.com`. Take copy verbatim.
   A full capture of the homepage text is in `_live-text.txt`, and the fact
   inventory is in `CONTENT-SOURCE.md`.
2. **Their Google Business Profile** — 5.0 from **91 reviews**, and **39 photos**
   of real completed jobs. The installation page needs real door photos; we are
   currently reusing the same three images across all four pages.
3. **The client** — for everything below. Nothing here can be guessed.

### Open questions for the client

**Installation**
- Which door brands do you carry?
- Materials and styles — steel, insulated, carriage, modern flush, glass?
- **Miami-Dade NOA / Florida Product Approval number and wind-load rating?**
  (A compliance claim. Must come from the client in writing.)
- Price range, and does it include haul-away of the old door?
- Warranty on a new door — the standard 60-day/3-year, or manufacturer-backed?
- Lead time for stock vs special order?

**Maintenance plan**
- Is $149 one visit a year or several?
- What is *not* included? Does it discount repairs found on the visit?
- How do customers sign up, and does it auto-renew?
- Residential only, or commercial pricing too?

**Still outstanding sitewide**
- License number (the site says "licensed" but never shows it)
- Street address — Google has *1975 Stirling Rd, Dania Beach, FL 33004*, the site publishes none
- Business hours — Google has them, the site doesn't
- Years in business

---

## Part 6 — Accuracy rules

These were set by the client and must hold.

1. **Copy comes from the client's own material.** Nothing invented.
2. **No fabricated trust signals.** Star ratings were added to testimonials once
   and had to be removed — the site showed no ratings. The 5.0 / 91 figure is
   real and verified from the Google profile; anything else needs a source.
3. **Reviews are verbatim**, with the reviewer's name as Google displays it.
   Five are currently published; the rest need to be collected from the listing.
4. **Flag gaps, don't fill them.** Mark `[CLIENT-INPUT NEEDED]` rather than
   writing plausible filler.
5. **Don't hot-link Google review photos.** Those `googleusercontent` URLs rotate
   and break, and the photos belong to the reviewers. Use the client's own.

---

## Part 7 — Build checklist

- [ ] Container measures exactly **1240px**; content starts at x=332 at 1920
- [ ] Section padding 80/80; heading→content 48
- [ ] One `<h1>`; `<main>` present; sections labelled
- [ ] Every card in a grid has a **distinct** icon
- [ ] No two same-coloured bands adjacent
- [ ] `<strong>` legible on every dark band
- [ ] CTA hierarchy used, not repeated red buttons
- [ ] JSON-LD parses; FAQPage matches the on-page accordion
- [ ] OG + Twitter tags present
- [ ] Related Services block links the other pages
- [ ] WhatsApp float present, number `19547701344`
- [ ] No horizontal overflow at 1280 / 1440 / 1600 / 1920
- [ ] No `<svg>` tags and no emoji in the HTML
