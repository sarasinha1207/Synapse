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
- Font: **Michroma**, regular (400) only, from Google Fonts. Used for the wordmark and nowhere else.
- Size: 17 px in the nav and footer; letter-spacing 0.02em; line height 1.1.
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

The home page uses the STC club-home pattern. Everything below is built.

| Section | Anchor | Background | Content | Status |
|---|---|---|---|---|
| Nav | - | frosted white | Brand group, links (Home, About, What we do, Events, Contact), "Join Synapse" button | Final structure |
| Hero | `#top` | white to `soft` + glow | Eyebrow "AI · ML · Deep Learning Club", h1, lead, two buttons, emblem card | Headline is draft |
| About | `#about` | white | Intro, placeholder paragraph, fact card (Council, Wing, Focus) | Facts real; paragraph placeholder |
| What we do | `#activities` | `soft` | Three icon cards: AI / ML projects, Deep learning, Neural networks | Titles from the STC page; descriptions draft |
| Featured event | `#events` | white | Facts strip and 3-stage timeline | **All placeholder** |
| Join | `#join` | `soft` | CTA band: "Ready to build with Synapse?" | Copy draft; "Get involved" has no real form yet |
| Footer | `#contact` | ink | Brand group, Synapse links, STC links, contact | Synapse's own email/socials missing |

Hero emblem: 15rem wide on phones, 19rem from 832 px; 1.5rem corner radius; a soft `--brand` glow; drifts up and down 8 px on a 6 s loop (disabled for reduced motion).

---

## 6. Content

All text lives in one typed file, `synapse-web/src/synapse/content.ts`. Edit copy there, not in components.

**Facts that come from the STC site (safe to keep):**
- Club description: "AI, ML & Deep Learning Club", "The AI/ML Club"
- Parent wing: TATVA, Technology & Research Cell; council: Student Technical Council, IIT Patna Hybrid Programs
- Key activities: AI/ML projects, Deep learning, Neural networks
- Address: IIT Patna, Bihta, Patna - 801106; emails `tatva@iitp.ac.in` (TATVA) and `stc_iitp@iitp.ac.in` (STC); STC Instagram and LinkedIn links

**Draft copy (marked `PLACEHOLDER` in the file; replace before publishing):**
- Hero headline "Learn AI by **building it**"
- About paragraph, the three activity descriptions, "Learn it, build it, **break it**"
- The entire featured-event block (name, dates, facts, stages)
- Join section text and the "Get involved" target

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
- The event page template itself is not built yet (see STC UI section 5.2 for the recommended order).

---

## 8. Files and how to run

```
synapse-web/src/
  synapse/
    theme.css          --brand and the wordmark gradient/font tokens
    content.ts         all page copy, typed
    sections.tsx       Hero, About, Activities, FeaturedEvent, Join
    chrome.tsx         Synapse nav and footer (wire content into the shared shell)
    lockup.tsx         emblem + wordmark + tagline
    wordmark.tsx       the gradient "SYNAPSE" text
    hero-emblem.tsx    hero emblem with the float motion
    assets/synapse-emblem.png
  stc-ui/              shared layer: do not edit per club
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

- [ ] Replace placeholder copy (hero, About, activities, featured event, Join)
- [ ] Point "Get involved" at the real join or registration form
- [ ] Add Synapse's own email and social links to the footer
- [ ] Get a larger or transparent emblem from the club (current file is 304 x 375)
- [ ] Add a square favicon and a social-share image (neither exists yet)
- [ ] Decide the domain and hosting
- [ ] Build the Team, Events and Projects pages if wanted (only the home page exists)
- [ ] Run the contrast table in 3.3 again if any colour changes
- [ ] Have STC leadership confirm that the STC logo and club logo may be used as shown

## 10. Changelog

| Version | Date | Notes |
|---|---|---|
| 0.1 | 2026-11-05 | First draft: identity, blue accent derived from the logo, home-page structure, content model |
