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

## What changed in this revision

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
