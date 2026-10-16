# Parish of the Dormition of the Mother of God — website

A single, self-contained web page for the parish, built with the
`singapore-orthodox-brand-guideline` design system (liturgical palette, EB Garamond
display type, gold hairline "icon-ark" frames, eight-pointed cross).

## The deliverable

**`index.html` — one file, nothing else.** All four photographs are embedded directly
in the file (as base64), so there is no `img/` folder and nothing else to upload. Put
`index.html` on any static host (Netlify, GitHub Pages, Cloudflare Pages, a plain web
server) or open it straight from disk. Fonts load from Google Fonts; everything else is
inline.

## Languages (11)

Default is **English**. The switcher (top-right) also offers **Русский, 中文, Bahasa
Melayu, தமிழ், Bahasa Indonesia, Tiếng Việt, ไทย, 한국어, 日本語, Filipino**. The choice
is remembered in the browser. Every part of the site is translated — the interface, the
live schedule (weekday names *and* service names), and all three prayer texts.

## Update of 16 October 2026

- **Donations — October 2026 sheet (dated 3 October 2026).** September balance S$263.37 +
  S$6,237.90 donated 27 Sep–3 Oct = **S$6,501.27** of the S$18,000 monthly need; **S$11,498.73**
  still needed (36%). Strings are in the `DON_OCT` block of `index.html` (all 18 languages; it
  overrides the older `DON_SEP` / `DON_AUG` blocks), plus the static Russian fallback text and the
  two progress bars (`width:36%`).
- **Photos.** Three new parish photos added as `photos/26.jpg`–`28.jpg`, and 35 photos from the
  hierarchical Liturgy of 11 October 2026 as `photos/29.jpg`–`63.jpg` (the slideshow picks up
  numbered files automatically). The slideshow now starts loading photos only when a visitor
  scrolls near it, so the 63 photos (~17 MB) are not downloaded on every page view.
- **Church calendar.** Full service instructions (Богослужебные указания, from azbyka.ru) and
  Scripture readings with zachala added for **22 October – 2 December 2026** — everything azbyka
  had published on 16 October — in all 18 languages. Readings no longer repeat the zachalo
  number, and Arabic dates now show the Gregorian calendar instead of the Hijri one.
  New-language rubric texts were machine-translated and should be reviewed like the others.

- **Hero background video.** `video/hero.mp4` + `video/hero.webm` (35 s silent loop from the
  11 October Liturgy, ~3 MB each; the browser downloads only one). It plays behind the hero on
  screens 768 px and wider, fades in once it starts, pauses when scrolled away, and has a
  pause/play button (WCAG 2.2.2). **Phones keep the still photo**, as do visitors with
  "reduce motion" or data-saver turned on — nothing is downloaded for them. To change the clip,
  replace the two files (keep the names).
- **Calendar data moved out of `calendar.html`** into `calendar-data/2026-01.js` … `2026-12.js`.
  The page now loads only the month being viewed (it was a single 29 MB file, over GitHub's 25 MB
  browser-upload limit). To add a month, add its `calendar-data/YYYY-MM.js` file; when a month
  file changes, bump `CAL_DATA_VER` in `calendar.html` so browsers fetch the new copy.

## What changed in an earlier revision

- **Everything is inlined into one file.** The photos are now base64 data-URIs inside
  `index.html`; the separate image folder is gone.
- **Six new languages** were added — Indonesian, Vietnamese, Thai, Korean, Japanese and
  Filipino — alongside the existing five. This covers the interface and the prayers.
- **The prayer search bar was removed** (there are only three texts, so they are simply
  listed and open on tap). Each still carries Church Slavonic, a Latin pronunciation
  where sung, and all the translated versions.
- **The hero's "Service texts" button is now "Support the parish,"** linking to the
  giving section. (The prayers remain reachable by scrolling.)
- **The giving section was rewritten around the parish's real need,** using the figures
  from the parish's July 2026 donation sheet: the parish needs about **S$18,000 every
  month** for house rent and running costs, **receives no government funding**, and
  **rents its premises**. By **11 July 2026** only about **S$9,035** had come in — roughly
  half — and, with June's shortfall carried over, the parish was about **S$12,337 short**.
  The section shows these three figures, a progress bar, the honest "no government
  support / rented premises" note, and both the PayNow (UEN T08SS0198H) and OCBC bank
  (591-405824-001, RUSSIAN ORTHODOX CHURCH) details.

Retained from before: the live styled schedule generated from the parish's Google
Calendar (with an optional API key for a permanently-live version — see the comment at
`const GCAL_API_KEY` in the file), the brand-coloured PayNow QR, the reflection on depth
over spectacle, and the WhatsApp / Facebook links.

---

## Please review before publishing — important

The footer still marks this an **unofficial demonstration site**. Before it goes live:

1. **The new-language prayer texts need a native Orthodox review — this matters most.**
   The Church Slavonic and English are authoritative. The **Indonesian, Vietnamese, Thai,
   Korean and Japanese versions of the three prayers (and the interface text) were
   generated here and should be checked, and ideally replaced with the official
   translations of the relevant Orthodox jurisdictions** — e.g. the Japanese Orthodox
   Church (Moscow Patriarchate) and the Korean Orthodox Metropolis both have authorised
   liturgical texts; likewise for Indonesian, Thai and Filipino/Chinese/Malay/Tamil. All
   versions of the Creed use the Orthodox form **without the *filioque*** ("proceeds from
   the Father" only) — please keep it so in any replacement.
2. **The donation figures are a dated snapshot** (11 July 2026). Update them, or replace
   them with a note, when the numbers change. They are plain text in the giving section
   (`#donate`) and the early call-to-action band.
3. **Photo consent.** The four embedded photos are the parish's own, but faces are
   visible (the hero and history bands include children, though dimmed). Confirm consent
   to publish each. To swap one, replace its base64 value in the `:root` variables
   (`--img-hero`, `--img-story`, `--img-visit`, `--img-depth`).
4. **Catechetical wording** (Confession/Communion, "who may receive") and the facts
   (address, the "more than 200" figure, new-church status) — confirm with the clergy.
5. **Test the PayNow QR** once with a banking app (UEN T08SS0198H).
6. Optionally **add a Google API key** (`const GCAL_API_KEY`) for a permanently-live
   schedule; otherwise it uses a snapshot and falls back to the embedded calendar.
7. When approved, **remove the footer disclaimer** (the `fDisc` line in `index.html`).

## Editing notes

- All interface text lives in the `I18N` object (one block per language), with newer
  strings merged from an `EXTRA` object. The three prayer texts are in the `PRAYERS`
  array; the calendar snapshot and service-name translations are in the schedule script
  just above it.
- Colours, fonts and layout come from the brand guideline; keep icons and the cross
  uncropped and avoid national/state symbols, per the guideline's conduct rules.
