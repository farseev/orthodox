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
- **No children's faces and no photos of the family who asked, anywhere on the site.** Every photo
  where a child's face could be seen, even in the background, was taken out — from the slideshow,
  the five images embedded in `index.html` (`--img-hero`, `--img-story`, `--img-visit`,
  `--img-depth`, `--img-school`), `og-image.jpg` and the hero video. Photos where children are seen
  only from behind, with no face visible (`05`, `08`, `14`, `19`, `41` and the history-band image),
  were kept. No file was deleted: slots `03`, `04` and `07.jpg` now hold other clergy photos from
  11 October; the other 32 retired numbers hold a copy of `20.jpg` and are listed in the slideshow's
  `SKIP` set, so they are never shown. The slideshow shows 31 photos. **Before adding a photo,
  check that no child's face and no one who has asked not to appear is in it**; give it the next
  free number (64, 65, …) — retired numbers stay in `SKIP`. Older versions of the replaced photos
  remain in the repository's git history.
- The slideshow starts loading photos only when a visitor scrolls near it.
- **"Follow us" section.** The Facebook Page Plugin was replaced by a static card that matches the
  Instagram one: the page name, four of the site's own photos and a "See more on Facebook" link.
  Facebook's plugin was showing an empty frame or a log-in prompt to visitors who are not logged in
  to Facebook or whose browser blocks third-party cookies (Safari, Firefox), and it had a fixed
  420 px width that did not fit phones. It would also have shown whatever is posted on the Facebook
  page, children included. Both cards now have square corners, the gold hairline and no shadow or
  hover-zoom, per the brand guideline, and the untranslated "Follow" button was removed. Their
  photos are set in `index.html` (`#social`); use only photos that are cleared for the site.
- **Church calendar.** Full service instructions (Богослужебные указания, from azbyka.ru) and
  Scripture readings with zachala added for **22 October – 2 December 2026** — everything azbyka
  had published on 16 October — in all 18 languages. Readings no longer repeat the zachalo
  number, and Arabic dates now show the Gregorian calendar instead of the Hijri one.
  New-language rubric texts were machine-translated and should be reviewed like the others.

- **Hero background video.** `video/hero.mp4` + `video/hero.webm` (20 s silent loop of the
  bishop and priests at the royal doors, 11 October Liturgy, ~1.2 MB each; the browser downloads
  only one; no children in it). It plays behind the hero on
  screens 768 px and wider, fades in once it starts, pauses when scrolled away, and has a
  pause/play button (WCAG 2.2.2). **Phones keep the still photo**, as do visitors with
  "reduce motion" or data-saver turned on — nothing is downloaded for them. To change the clip,
  replace the two files (keep the names).
- **Calendar data moved out of `calendar.html`** into `calendar-data/2026-01.js` … `2026-12.js`.
  The page now loads only the month being viewed (it was a single 29 MB file, over GitHub's 25 MB
  browser-upload limit). To add a month, add its `calendar-data/YYYY-MM.js` file; when a month
  file changes, bump `CAL_DATA_VER` in `calendar.html` so browsers fetch the new copy.

- **Illustrations for the Readings (blog).** Each of the 30 articles now has its own engraving,
  generated with SOMIN's image generator in one style: sepia copperplate engraving on cream paper
  with a little gold leaf. They show symbolic still lifes and places only — no people, no icons or
  holy figures, and no text. That follows the brand rules: an icon is a liturgical object, not a
  graphic, and no stock people. Each image is used at the head of the article in all 18 languages
  (framed like an icon ark), as the article's share image (`og:image`, JSON-LD, sitemap), and as the
  preview on the Readings index cards and in "Related reading". Files: `blog/img/<slug>.jpg`
  (1536×864) and `blog/img/<slug>-card.jpg` (720×405). For a new article, make an image in the same
  style and save both sizes with the article's slug.
- **Audio Bible — `bible.html` («Аудиобиблия»).** All 77 books of the Synodal Bible (27 New
  Testament, 50 Old Testament, Orthodox order), recorded by the Orthodox portal «Иисус»
  (jesus-portal.ru, АНО «Познание»). The page is linked from the menu on every page and from a new
  section on the home page, and its interface is in all 18 languages (the recordings are in Russian).
  It remembers where each listener stopped and goes on to the next book by itself.
  - **For now each book plays through YouTube's official player** (privacy-enhanced
    youtube-nocookie), with a «Слушать в Telegram» link to the portal's own post in
    t.me/BibliaVmeste. YouTube in a browser stops when the phone screen locks, so the page tells
    listeners to use Telegram in the car or in the background.
  - **The portal's rules (clause 1.10) forbid copying its audio without consent**, so the recordings
    are not hosted here. If the portal agrees, put the files at `AUDIO_BASE + code + ".m4a"`
    (`nt01` … `nt27`, `ot01` … `ot50`, in the order of the page) and set `AUDIO_BASE` at the top of the
    script in `bible.html`. The page then plays them directly, keeps playing with the screen locked,
    and shows lock-screen and car controls (Media Session), with ±15/30 s and speed. The whole Bible is
    116 hours, about 1.2–1.7 GB as speech-quality AAC, which is over GitHub Pages' 1 GB site limit. Host
    the files elsewhere (for example the Internet Archive or Cloudflare R2) and point `AUDIO_BASE`
    there; the New Testament alone (20.5 h, about 300 MB) would fit in this repository.
- The menu now has six items. On screens wider than phones the parish name wraps onto two lines so
  "Support the parish" stays visible.

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
3. **Photo consent.** Children's faces and the family who asked have been removed (see the
   16 October update). Adults' faces are still visible in the photos; confirm the parish is
   content to publish each. To swap an embedded image, replace its base64 value in the `:root`
   variables (`--img-hero`, `--img-story`, `--img-visit`, `--img-depth`, `--img-school`).
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
