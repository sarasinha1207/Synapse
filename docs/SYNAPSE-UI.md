# Synapse UI: identity and site specification

| | |
|---|---|
| **Status** | Draft v0.1 |
| **Club** | Synapse, "The AI/ML Club" (AI, machine learning and deep learning) |
| **Part of** | TATVA (Technology & Research Cell), Student Technical Council (STC), IIT Patna Hybrid Programs |
| **Built on** | `STC-UI.md` (the shared design system). This document covers only what is specific to Synapse |
| **Source of facts** | The club's page on the STC site, <https://www.stciitphybrid.in/wings/tatva/subclubs/synapse>, read on 2026-11-05 |
| **Reference implementation** | `synapse-web/` (Next.js). Synapse-specific code is in `synapse-web/src/synapse/` |

---

## 1. What Synapse changes (and what it inherits)

Synapse is **layer 2** in the STC UI model: it supplies a colour, a logo and its own copy, and inherits everything else.

| | Synapse provides | Inherited from STC UI |
|---|---|---|
| Colour | `--brand` = Synapse blue (section 3) | All neutrals, derived tints, contrast rules |
| Identity | Emblem, gradient wordmark, tagline (section 2) | STC badge, nav and footer structure |
| Content | All page copy (section 6) | Fonts (Outfit), type scale, spacing, radius, shadows |
| Layout | Which sections appear, and their order (section 5) | Every component and its behaviour |

If something is not listed in the left column, do not customise it for Synapse; change it in STC UI instead so every club benefits.

---

## 2. Identity

### 2.1 Logo kit

| Asset | File | Size | Use |
|---|---|---|---|
| Synapse emblem (brain: half outline, half neural network, on a blue-to-indigo card) | `src/synapse/assets/synapse-emblem.png` | 304 x 375 px, PNG | Nav mark, footer mark, hero artwork |
| STC logo (white background JPG) | `src/stc-ui/assets/stc-logo.jpg` | 1053 x 997 px, JPG | Always inside the white STC badge |
| "SYNAPSE" wordmark | live text, no file | - | Nav, footer (and anywhere the full lockup is shown) |

The emblem and the STC logo were copied from the STC website (`/DomainCards/Synapse.png` and `/images/stc-logo.jpg`).

> **Limitation:** the emblem is a small card thumbnail. It is crisp up to about 19rem (304 px) and looks soft if enlarged. If the club has an original, larger or transparent logo, replace the file and keep the file name.

### 2.2 Wordmark
- Text: **SYNAPSE** (uppercase), set as live text, not an image.
- Font: **Orbitron**, bold (700), from Google Fonts. Used for the wordmark and nowhere else. (It replaced Michroma, whose single light weight looked thin at nav size.)
- Size: 17 px in the nav and footer; letter-spacing 0.06em; line height 1.1.
- Fill: a left-to-right gradient, `linear-gradient(90deg, #118CE5 0%, #9142F6 90%)` (blue to violet), applied to the text with `background-clip: text`. These are the colours used by the wordmark on the club's STC page.
- The gradient belongs to the wordmark only. Do not use it for buttons, backgrounds, headings or body text.

### 2.3 Lockup
The nav and footer start with the shared brand group:

```
[ STC badge ]  |  [ emblem ]  SYNAPSE
                              THE AI/ML CLUB
```

- STC badge 40 px square on white; divider 1 px x 28 px; emblem 40 px tall (about 32 px wide), 4 px corner radius.
- Tagline: **THE AI/ML CLUB**, label style (10 px, uppercase, 0.08em tracking), `muted` on light backgrounds and `on-dark-muted` on the footer.
- The whole lockup is one link (to the top of the page) with an accessible name; the emblem inside is decorative (`alt=""`).

**Do:** keep the emblem's proportions; keep the STC badge white; use the lockup as shown.
**Don't:** stretch, recolour or add effects to the emblem; put the wordmark on a busy background; show the Synapse lockup without the STC badge in nav or footer.

---

## 3. Colour

### 3.1 Brand colour

```css
[data-club="synapse"] {
  --brand: oklch(0.53 0.18 256);   /* about #0268d0 */
}
```

**Why not the logo blue?** The wordmark's blue, `#118CE5`, is only **3.56:1** against white, too light for button text and small labels. `--brand` is a deeper blue in the same family (hue 256 against the logo's 248) that clears AA everywhere it is used.

### 3.2 Derived values (computed automatically from `--brand`)

| Token | Value | Role |
|---|---|---|
| `--brand` | `#0268d0` | Buttons, accent words in headings, icons |
| `--brand-hover` | `#0154aa` | Button hover |
| `--brand-deep` | `#01438b` | Dark end of CTA band, label on light buttons |
| `--brand-end` | `#5b94e1` | Decorative only |
| `--brand-tint` | `#ecf3fc` | Pill and icon-tile background, active nav item |
| `--brand-tint-2` | `#dae7fa` | Hero glow |
| `--brand-line` | `#bfd6f5` | Hover borders |

### 3.3 Verified contrast (WCAG 2.x; normal text needs 4.5:1)

| Pairing | Ratio | Result |
|---|---|---|
| White on `--brand` (primary button) | 5.38 | Pass |
| `--brand` on white (accent word in heading) | 5.38 | Pass |
| `--brand` on `--brand-tint` (eyebrow pill) | 4.83 | Pass |
| `--brand` on `soft` (accent word on a grey section) | 5.16 | Pass |
| White on `--brand-hover` | 7.38 | Pass |
| White on `--brand-deep` (CTA band, darkest stop) | 9.65 | Pass |
| `--brand` on `--brand-tint-2` | 4.32 | **Fail, never use** |
| `--brand` on `--brand-end` | 1.74 | **Fail, never use** |
| Logo blue `#118CE5` on white | 3.56 | Fails as text, which is why it is not `--brand` |
| Logo violet `#9142F6` on white | 4.87 | Wordmark only |

Rule if the accent is ever changed: keep oklch lightness at or below about 0.56, and re-check the table above.

---

## 4. Synapse versus the other STC accents

STC's own pages use blue (council), red (DISHA), amber (ARTHNITI) and teal (TATVA). Synapse sits in the blue family. It is a deeper, slightly cooler blue than the council's vivid royal blue (`#155dfc`), so it reads as related but not identical. If clearer separation from the council is wanted, change the single `--brand` line; nothing else needs to move.

---

## 5. Site structure

Synapse has **four pages**. The nav (Home, Events, Resources, and a **Contact Us** button) and the footer appear on every page. Everything below is built.

### 5.1 Home (`/`)

| Section | Anchor | Background | Content | Status |
|---|---|---|---|---|
| Hero | - | white to `soft` + dot grid + glow | Left: eyebrow "AI · ML · Deep Learning Club", h1, lead, buttons "Explore resources" and "Ask a doubt", three highlights (Hands-on projects, Shared revision material, Webinars & quizzes). Right: the emblem card in two rings with tags "TATVA wing" and "STC · IIT Patna" | Headline is draft |
| About | `#about` | white | Left: a lead paragraph and a supporting paragraph. Right: an "At a glance" card (Council, Wing, Focus, each with an icon) | Facts and first paragraph from the STC site; second paragraph is draft |
| Key focus areas | `#focus` | `soft` | Eight cards: AI & machine learning, Deep learning, Python & libraries, Computer vision, Natural language processing, Projects & research, Webinars & talks, Revision & practice | AI & ML, deep learning and projects come from the STC page; Python, webinars and revision reflect what the club shares and runs; **Computer vision and NLP are drafts: confirm the club covers them or swap the topics**. All descriptions are draft |
| Events | `#events` | white | The next (up to three) upcoming event cards and a "See all events" link | Pulled from the Events data, which is **all sample content** for now |
| Where we belong | `#belonging` | `soft` | "Synapse is part of **TATVA**" with three cards: **Purpose of STC** (one central, well-structured platform for students' academic and professional aspirations), **Purpose of TATVA** (technical expertise and a research mindset, bridging academic learning and real-world technology) and **How Synapse completes the vision** (AI/ML is where TATVA's aim happens in practice: learning, projects, revision) | Purposes paraphrased from the STC site; the third card is draft |

Hero emblem: 15rem wide on phones, 19rem from 832 px; 1.5rem corner radius; a soft `--brand` glow; drifts up and down 8 px on a 6 s loop (disabled for reduced motion).

### 5.2 Events (`/events`)

| Section | Anchor | Background | Content | Status |
|---|---|---|---|---|
| Header | - | white to `soft` + glow | "Webinars and events, **past and upcoming**" | Draft |
| Upcoming events | `#upcoming` | white | One card per upcoming event, soonest first | Sample content |
| Past events | `#past` | `soft` | One card per past event, most recent first | Sample content |

Each card shows: the **event heading**, **About**, **Speaker**, **Date**, **Time** (India time, "6:00 PM IST") and **Platform**, each row with its own icon. You only enter the start date and time once (`startsAt`); the card works out Date and Time, and whether the event is upcoming or past.

### 5.3 Resources (`/resources`)

| Section | Anchor | Background | Content | Status |
|---|---|---|---|---|
| Header | - | white to `soft` + glow | "Everything we share, **in one place**" | Draft |
| Browse resources | `#documents` | white | A category filter (All, Study material, Revision material, Quiz, Roadmap, Cheat sheet, each with a count) above one grid of document cards | Two real documents so far |
| Help band | - | `soft` | "Stuck on something?" with an **Ask a doubt** button to the Contact page | Draft |

Each document card shows: the **heading**, then three icon-only rows (the **full document name**, for example `Roadmap.pdf`; the **category**; the **date it was provided**), and two buttons: **View** (a Google Drive link that opens in a new tab) and **Download** (the PDF from the site's own folder). A quiz can also have a **Leaderboard** button.

The categories are fixed for now: Study material, Revision material, Quiz, Roadmap, Cheat sheet.

**Documents provided so far** (both filed as Revision material, dated 14 Oct 2026 from the files' own dates; change the dates to the day each was really shared):
- Supervised Learning Revision Guide: `Supervised_Learning_Revision_Guide.pdf`
- Python and Libraries Revision Guide: `Python_and_Libraries_Revision_Guide.pdf` (the original file name had the typo "Libaries"; the copy in the site is spelled correctly)

**Where the files live:** `synapse-web/public/resources/`. Put every new PDF there, using file names without spaces. Neither document has its Google Drive "View" link yet, so the **View** button on each card is dimmed and does nothing until you add the link.

### 5.4 Contact Us (`/contact`)

| Section | Content |
|---|---|
| Header | "Got a doubt? **Ask us**" |
| Submit a doubt (form) | Name, email, topic, message. Topics: a concept (AI, ML or deep learning), a quiz or its leaderboard, shared revision material, an event, something else |
| Other ways to reach us | TATVA and STC emails, the address, and a pointer to Resources |

The form checks the details on the server, tells the visitor exactly what to fix (and keeps what they typed), then forwards the doubt as JSON to the address in the `DOUBTS_WEBHOOK_URL` setting. **Until that setting is filled in, the form tells visitors it is not switched on yet and shows the TATVA email instead.** See the README in `synapse-web/` for setup, including a Google Sheets recipe.

---

## 6. Content

All text lives in typed files, one per page, in `synapse-web/src/synapse/content/`. Edit copy there, not in components.

| File | What it holds |
|---|---|
| `site.ts` | Club name, navigation, footer, address and emails |
| `home.ts` | Hero, About, Key focus areas, the Events preview wording, "Where we belong" (STC and TATVA) |
| `events.ts` | The Events page: every event (heading, about, speaker, start date and time, platform) |
| `resources.ts` | The Resources page: the fixed categories and every document (title, file name, category, date, Drive link, download path) |
| `contact.ts` | Contact header, form labels, topic list, privacy line, success and error messages |

**Facts that come from the STC site (safe to keep):**
- Club description: "AI, ML & Deep Learning Club", "The AI/ML Club"
- Parent wing: TATVA, Technology & Research Cell; council: Student Technical Council, IIT Patna Hybrid Programs
- Key activities: AI/ML projects, Deep learning, Neural networks
- Address: IIT Patna, Bihta, Patna - 801106; emails `tatva@iitp.ac.in` (TATVA) and `stc_iitp@iitp.ac.in` (STC); STC Instagram and LinkedIn links

**Draft copy (marked `DRAFT` or `PLACEHOLDER` in the files; confirm or replace before publishing):**
- Hero headline "Learn AI by **building it**"
- The second About paragraph and the four focus-area descriptions (written from the STC page plus what the club shares and runs)
- All three Events: each shows a **Sample** tag until you remove `sample: true`. (The two resource documents are real, but their dates and Drive links still need confirming)
- Resources and Contact intro lines, and the privacy line under the form ("Your name and email are used only to reply to your doubt"): confirm it matches how the club really handles these details
- The promise "a Synapse member will reply by email": confirm the club can keep it

**Adding an event:** copy an entry in `events.ts`, change the text, set `startsAt` (for example `2026-12-15T18:00:00+05:30`), and delete `sample: true`.

**Adding a document:** copy the PDF into `public/resources/`, then copy an entry in `resources.ts` and set its title, file name, category, date, Drive link (`viewHref`) and `downloadHref` (`/resources/<file name>`). Full steps are at the top of that file.

**Writing style:** short sentences, active voice, say what members actually do. The STC UI heading pattern puts the key phrase in the accent colour, so write headings as "plain words + **accent phrase**".

---

## 7. Synapse event and competition pages

Synapse events use the same nav, footer and components, with an **event skin** (STC UI section 6):

```html
<html lang="en" data-club="synapse" data-event="your-event-name">
```

- Add `src/<event>/skin.css` after the Synapse theme. It may set `--brand`, `--font-label`, `--label-case`, `--label-tracking` and nothing else.
- Keep the STC badge, the Synapse lockup and the footer on every event page.
- Re-check the contrast table (3.3) for the event accent.
- Use the shared **facts strip** (Format / Duration / Participation / Registration) and **stage timeline**; add a persistent Register button.
- The event page template itself is not built yet (see STC UI section 5.4 for the recommended order).

---

## 8. Files and how to run

```
synapse-web/src/
  app/
    layout.tsx           fonts, data-club, nav and footer for every page
    page.tsx             Home
    events/page.tsx      Events
    resources/page.tsx   Resources
    contact/page.tsx     Contact Us
  synapse/
    theme.css            --brand and the wordmark gradient/font tokens
    content/             all page copy and data, typed: site.ts, home.ts, events.ts, resources.ts, contact.ts
    home/                Hero, About, Key focus areas, Events preview, Where we belong (+ the floating emblem)
    events/              Upcoming and past events
    resources/           The filterable document list and the help band
    contact/             the doubt form, its server-side validation and the server action
    chrome.tsx           Synapse nav and footer (wire content into the shared shell)
    lockup.tsx           emblem + wordmark + tagline
    wordmark.tsx         the gradient "SYNAPSE" text
    assets/synapse-emblem.png
  stc-ui/                shared layer: do not edit per club
```

Run locally (Node 20.9 or newer):

```
cd synapse-web
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint && npm run typecheck
```

---

## 9. Before publishing: checklist

- [ ] Replace the placeholder copy (hero, About, focus areas) and the sample events, and remove every `sample: true`
- [ ] Add the Google Drive "View" link to each document in `resources.ts`, and confirm each document's date
- [ ] Add the club's other documents (quizzes, study material, roadmaps, cheat sheets) to `public/resources/` and `resources.ts`
- [ ] Read the "Where we belong" wording (purpose of STC, purpose of TATVA, how Synapse completes the vision) and confirm it says what the club wants to say
- [ ] Confirm large PDFs are OK to keep in the site folder (the two so far are 2.3 MB and 5.5 MB)
- [ ] **Set up where doubts go**: create the destination (for example a Google Sheet via Apps Script) and set `DOUBTS_WEBHOOK_URL` on the host; send a test doubt. Until then the form shows "not switched on yet"
- [ ] Decide who reads the doubts, who replies, and how fast, then confirm the "a Synapse member will reply" promise and the privacy line under the form
- [ ] Add Synapse's own email and social links to the footer and the Contact page
- [ ] Get a larger or transparent emblem from the club (current file is 304 x 375)
- [ ] Add a square favicon and a social-share image (neither exists yet)
- [ ] Decide the domain and **hosting**: the doubt form runs on the server, so it needs a Node host (such as Vercel or Netlify), not static file hosting
- [ ] Consider rate limiting or a CAPTCHA if the form attracts spam (it only has a hidden-field trap and length limits)
- [ ] Add Team and Projects pages later if wanted (the site is deliberately four pages for now)
- [ ] Run the contrast table in 3.3 again if any colour changes
- [ ] Have STC leadership confirm that the STC logo and club logo may be used as shown

## 10. Changelog

| Version | Date | Notes |
|---|---|---|
| 0.1 | 2026-11-05 | First draft: identity, blue accent derived from the logo, home-page structure, content model |
| 0.4 | 2026-11-05 | Wordmark font changed to Orbitron bold. "Where we belong" cut down to three purpose cards. Eight focus areas. Events and Resources: tighter space under the header, roomier cards. Resource rows are icon-only and View is always a (possibly disabled) button |
| 0.3 | 2026-11-05 | Added the Events page (heading, about, speaker, date, time, platform) and a fourth nav item. Resources redesigned: one filterable list of documents (heading, file name, category, date, View and Download) with the first two PDFs added. Home gained a closing "Where we belong" section about STC and TATVA. Google Sheets setup for the doubts form added |
| 0.2 | 2026-11-05 | Three pages: Home (About, Key focus areas, Events), Resources (Revision material shared, Quizzes conducted, with leaderboard links), Contact Us (doubt form). Content split into one file per page. Brief club and focus-area copy written (draft) |
