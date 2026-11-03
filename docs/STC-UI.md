# STC UI: shared design system for STC club and event websites

| | |
|---|---|
| **Status** | Draft v0.1, a proposed shared standard (not yet approved by the STC web team) |
| **Reference implementation** | The Synapse site (`synapse-web/`, folder `src/stc-ui/`) |
| **Visual source** | The STC website, <https://www.stciitphybrid.in/>. Values were measured from its live computed styles on 2026-11-05; the live site may have changed since |
| **Audience** | Web developers of STC clubs and event sites; STC web leads |
| **Companion doc** | `SYNAPSE-UI.md` (the first club built on this system) |

---

## 1. Purpose

Every STC club and every event or competition run by a club should look like **one family**: recognisably STC, with a clear identity for the club or event inside it. This document defines the shared layer so that different developers building different sites get the same result without coordinating screen by screen.

Two goals drive every rule below:

1. **Consistency.** Fonts, spacing, shapes, components and page structure are the same everywhere.
2. **One decision per club.** A club chooses **one accent colour** (and its logo). Nothing else needs to be designed.

---

## 2. The three layers

| Layer | Owned by | May change | May NOT change |
|---|---|---|---|
| **1. STC UI** (this document) | STC web team | everything in this document | - |
| **2. Club theme** | The club | `--brand` (accent colour), the club's logo and wordmark, copy | fonts, spacing, radius, shadows, layout, component behaviour |
| **3. Event skin** (optional) | The event | `--brand`, `--font-label`, `--label-case`, `--label-tracking` | body and heading fonts, radius, spacing, layout, components |

**How it works in code.** Layers load in this order, and later layers win:

```
tokens.css  ->  <club>/theme.css  ->  <event>/skin.css
```

- A club theme is one selector, `[data-club="synapse"]`, placed on `<html>`.
- An event skin is one selector, `[data-event="evidence-404"]`, also on `<html>`.
- Keep both selectors at specificity **(0,1,0)** (a single attribute selector) so that load order alone decides the winner. A more specific selector (for example `:root[data-club="x"]`) would stop an event skin from overriding the club colour.
- Every tint, hover colour and gradient is **derived** from `--brand` (see 3.2), so changing one value recolours the whole site consistently.

---

## 3. Design tokens

### 3.1 Typography

| | |
|---|---|
| Family | **Outfit** (Google Fonts), weights 400, 500, 600, 700. Same family as the STC site |
| Fallback stack | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Mono (event skins only) | `ui-monospace, "JetBrains Mono", SFMono-Regular, Menlo, Consolas, monospace` |

| Role | Size | Weight | Line height | Tracking | Colour |
|---|---|---|---|---|---|
| Hero heading (h1) | `clamp(2.5rem, 1.4rem + 4.2vw, 4rem)` (40 to 64 px) | 700 | 1.04 | -0.02em | ink |
| Section heading (h2) | `clamp(1.875rem, 1.2rem + 2.4vw, 3rem)` (30 to 48 px) | 700 | 1.1 | -0.01em | ink |
| Card / sub heading (h3) | 1.25rem (20 px) | 700 | 1.25 | normal | ink |
| Lead paragraph | 1.125rem (18 px) | 400 | 1.6 | normal | ink-2 |
| Body | 1rem (16 px) | 400 | 1.6 | normal | ink-2 |
| Small / UI text | 0.875rem (14 px) | 500 | 1.25 | normal | ink-2 or muted |
| **Label** (eyebrow pill, fact captions, stage tags) | 0.75rem (12 px) | 500 to 600 | 1 | 0.08em, UPPERCASE | brand or muted |

Headings use `text-wrap: balance` so they never end on a single orphan word. The label style is the one thing an event skin may restyle (see 6).

### 3.2 Colour

**Neutrals** are the Tailwind gray scale, which is what the STC site uses.

| Token | Value (hex / Tailwind) | Use |
|---|---|---|
| `soft` | `#f9fafb` / gray-50 | Alternate section background, hover backgrounds |
| `ink` | `#101828` / gray-900 | Headings, footer background |
| `ink-2` | `#364153` / gray-700 | Body copy |
| `muted` | `#4a5565` / gray-600 | Secondary copy, captions |
| `line` | `#e5e7eb` / gray-200 | Borders and dividers |
| `on-dark-muted` | `#d1d5dc` / gray-300 | Text on the dark footer |
| white | `#ffffff` | Page and card background |

**Brand: the one colour a club chooses.** Default (when no club theme is loaded) is the STC council blue, `oklch(0.546 0.245 262.881)`, about `#155dfc`.

Everything else is derived from `--brand` with CSS `color-mix()` in the `oklch` colour space:

| Token | Definition | Use |
|---|---|---|
| `--brand` | chosen by the club | Primary buttons, accent words in headings, links in active state, icons |
| `--on-brand` | `#fff` | Text on `--brand` |
| `--brand-hover` | `--brand` + 14% black | Button hover |
| `--brand-deep` | `--brand` + 26% black | Dark end of the CTA band, label on light buttons |
| `--brand-end` | `--brand` + 28% white | Decorative only |
| `--brand-tint` | 8% `--brand` in white | Pill background, active nav item, icon tile |
| `--brand-tint-2` | 16% `--brand` in white | Soft glow in the hero background |
| `--brand-line` | 28% `--brand` in white | Hover border on cards and buttons |

> The derived tokens are re-declared on `:root, [data-club], [data-event]`. This matters: a CSS custom property is resolved on the element that declares it, so derived values must be recomputed wherever `--brand` is overridden, otherwise they would silently keep the default blue.

**Wing accents on the STC site (reference only, approximate).** Wings already use one accent each; clubs follow the same idea.

| Wing / council | Accent seen on the STC site |
|---|---|
| Council (home) | blue, Tailwind blue-600 |
| DISHA | red, about red-600 |
| ARTHNITI | amber / orange, about amber-600 |
| TATVA | teal, about `#0d9488` |

**Choosing a club accent.** It must (a) pass the contrast rules in section 7, and (b) not be confusable with a neighbouring club. Keep lightness (`L` in oklch) at or below about **0.56** so white button text stays at 4.5:1 or better.

### 3.3 Shape, depth and layout

| Token | Value |
|---|---|
| Radius (default) | 0.625rem (10 px): cards, buttons, nav items, icon tiles |
| Radius (large) | 1.125rem (18 px): facts strip, CTA band |
| Radius (pill) | fully rounded: eyebrow labels |
| Shadow small | `0 1px 3px rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)` |
| Shadow medium | `0 14px 32px -14px rgb(15 23 42 / .22)` (hover, mobile menu) |
| Container | max width 72rem (1152 px), side gutter `clamp(1rem, 4vw, 2rem)` |
| Section padding | `clamp(3.5rem, 8vw, 5rem)` top and bottom |
| Nav height | 4rem (64 px) |
| Breakpoint | **52rem (832 px)**: nav collapses, hero and split sections stack. Footer goes to 2 columns at 32rem and 4 columns at 64rem |
| Motion | 150 to 200 ms colour/transform transitions; scroll-reveal 500 ms ease-out |

---

## 4. Components

Each component lists what it is, how it is built, and the rules that keep it consistent. Source files are in `src/stc-ui/` of the reference implementation.

### 4.1 Navigation bar (`site-nav.tsx`, `brand.tsx`)
- Sticky at the top, 64 px high, white at 90% opacity with a 10 px backdrop blur and the small shadow.
- **Brand group, always in this order:** `[STC logo badge] | [club lockup]`.
  - STC badge: 40 px rounded square, white background (the STC logo is a white JPG), small shadow, links to the STC site.
  - Divider: 1 px wide, 28 px tall, `line` colour.
  - Club lockup: club mark (40 px tall), club name, and a one-line descriptor in label style (10 px, uppercase, muted).
- Links: 14 px / 500, padding 8 x 14 px, radius 10. Hover = `soft` background. Current page = `--brand-tint` background with `--brand` text, and `aria-current="page"`.
- One primary CTA button (small size) at the right from 832 px up.
- Below 832 px: links collapse behind a 40 px menu button. The panel opens full width under the bar, repeats the CTA at the bottom, closes on Escape or after a tap, and the button carries `aria-expanded` and an accurate label.

### 4.2 Button (`button.tsx`)
All calls to action are links styled as buttons (to a section, a form, or another page).

| Variant | Look | Where |
|---|---|---|
| `primary` | `--brand` fill, white text, `--brand-hover` on hover | Main action |
| `secondary` | white fill, `line` border, ink text; hover = `--brand-tint` fill and `--brand-line` border | Second action beside a primary |
| `light` | white fill, `--brand-deep` text | Primary action **on a brand background** (CTA band) |
| `outlineLight` | transparent, 55% white border, white text | Second action on a brand background |

Sizes: default (padding 12 x 20, about 44 px tall) and small (padding 8 x 16, about 36 px tall, desktop nav only). Text 14 px / 500, radius 10, optional 16 px icon with an 8 px gap.

### 4.3 Eyebrow label (`eyebrow.tsx`)
A small pill above a heading: `--brand-tint` background, `--brand` text, label type style, padding 6 x 14 px, fully rounded.

### 4.4 Section heading (`section-head.tsx`): the STC "two-tone" heading
Eyebrow pill, then an h2 whose **last words are in `--brand`**, then an optional muted paragraph (max 40rem). Left-aligned by default, centred when the section is a grid of cards. 40 px gap below.
Example: "Learn it, build it, **break it**".

### 4.5 Card (`card.tsx`)
White background, 1 px `line` border, radius 10, small shadow, 24 px padding. On hover it lifts 3 px, gains the medium shadow and a `--brand-line` border over 200 ms (the movement is removed for visitors who prefer reduced motion).
Icon tile: 44 px square, radius 10, `--brand-tint` background, `--brand` icon (24 px, 1.75 stroke).

### 4.6 Facts strip (`facts-strip.tsx`), an event pattern
A single bordered box (radius 18, small shadow) holding label/value pairs such as **Format / Duration / Participation / Registration**. Four across on desktop; 2 x 2 on phones. Label = label style in `muted`; value = 600 weight, `ink`.

### 4.7 Stage timeline (`timeline.tsx`), an event pattern
Numbered rows ("Stage 01", "Day 02" ...) separated by `line` dividers. Desktop grid: 8rem tag | title | description (1 : 2). Tag = label style in `--brand`; title 17 px / 600; description 15 px / `muted`. Rows stack on phones.

### 4.8 CTA band (`cta-band.tsx`)
Large rounded block (radius 18) with a 135-degree gradient from `--brand` to `--brand-deep`, centred white h2, a paragraph at 92% white, and one `light` plus one `outlineLight` button. White on `--brand` is the lightest pairing in the band, so it must stay at or above 4.5:1.

### 4.9 Footer (`site-footer.tsx`)
`ink` background, white headings, `on-dark-muted` text. Four columns: **brand group + one-sentence blurb** (the STC badge sits on white so it works on dark), **club links**, **STC links** (council site, the wing page, STC events, Instagram, LinkedIn), **contact** (address, wing email, council email). Final row: a 12%-white top border and the legal line. Link hover = white with underline; focus ring = white.

### 4.10 Reveal on scroll (`reveal.tsx`)
Content fades in and rises 16 px (500 ms, ease-out, once) when scrolled into view. Rules: never use it above the fold (it must not delay the hero), skip it entirely for reduced-motion visitors, and make content visible when JavaScript is off.

### 4.11 Container (`container.tsx`)
`max-width: 72rem`, centred, with the responsive gutter from 3.3. Every section wraps its content in it.

---

## 5. Page patterns

### 5.1 Club home page
Sections alternate white and `soft` backgrounds:

1. **Nav**
2. **Hero** (white to `soft` gradient with a faint `--brand-tint-2` glow at the top right): eyebrow, two-tone h1, lead paragraph, primary + secondary button; the club's artwork on the right (stacks below on phones)
3. **About** (white): eyebrow, two-tone h2, short copy; a card of key facts (council, wing, focus)
4. **What we do** (`soft`): centred heading, a responsive grid of icon cards (auto-fit, 16rem minimum)
5. **Featured event** (white): heading, facts strip, stage timeline
6. **Join** (`soft`): the CTA band
7. **Footer**

Anchors: `#top`, `#about`, `#activities`, `#events`, `#join`, `#contact`.

### 5.2 Event or competition page (recommended pattern, based on the WebWiser "Evidence 404" page)
Same nav and footer as the club, with an event skin applied. Suggested order: hero (event name, one-line pitch, dates, primary Register button) -> facts strip -> overview/brief -> how it works (3 to 4 numbered steps) -> stage timeline -> rules, prizes and policy -> sponsors/organisers -> Register CTA band.
Patterns worth keeping from that page: numbered section eyebrows, the Format/Duration/Participation facts strip, a key-dates strip, a day-by-day timeline, and a persistent Register button.
Recommendation: host event sites on an STC or club domain, and show sponsors as a badge or strip, so the STC/club identity stays primary.

---

## 6. Event skins (layer 3)

An event skin is a small CSS file loaded after the club theme:

```css
/* events/evidence-404/skin.css, loaded after the club theme */
[data-event="evidence-404"] {
  --brand: oklch(0.5 0.27 293);        /* event accent */
  --font-label: var(--stc-font-mono);  /* optional: mono labels for a technical feel */
  --label-tracking: 0.12em;            /* optional */
}
```

and `data-event="evidence-404"` on `<html>` next to `data-club`.

- **Allowed:** `--brand`, `--font-label`, `--label-case`, `--label-tracking`. If a mono font is used, load it and put it in `--stc-font-mono`.
- **Not allowed:** body/heading fonts, radius, spacing, layout, component structure, removing the STC badge or the footer.
- The event accent must pass section 7 on its own; the derived tints recompute automatically.
- Tested behaviour: an event skin changes the button, pill tint, CTA band and label font while heading font and radius stay unchanged.

---

## 7. Accessibility

Minimum bar for every STC site: **WCAG 2.2 level AA**.

**Verified contrast ratios** (WCAG relative luminance; normal text needs 4.5:1, large text 3:1):

| Pairing | Ratio |
|---|---|
| ink on white (headings) | 17.75 |
| ink-2 on white (body) | 10.31 |
| muted on white (captions) | 7.56 |
| muted on `soft` | 7.24 |
| white on ink (footer headings) | 17.75 |
| on-dark-muted on ink (footer text) | 12.06 |
| STC blue: white on blue / blue on white | 5.26 |

Brand-dependent pairings are checked per club (see `SYNAPSE-UI.md` for Synapse's numbers). The rules:

- **Safe:** white text on `--brand`; `--brand` text on white, on `soft`, and on `--brand-tint`; white text on `--brand-hover` and `--brand-deep`.
- **Never:** `--brand` text on `--brand-tint-2` or on `--brand-end` (these fail for typical accents).
- **Focus:** every interactive element shows a visible 2 px `--brand` outline with 3 px offset on light backgrounds, white on the dark footer.
- **Structure:** a "Skip to content" link, one `h1`, headings in order, landmarks (`header`, `nav`, `main`, `footer`), `lang="en"`, `aria-current` on the active nav link.
- **Images:** meaningful images have alt text; decorative ones use `alt=""`. When the club lockup link already has a label, its mark is decorative.
- **Motion:** respect `prefers-reduced-motion`; no information is conveyed by motion alone.
- **Targets:** default buttons are about 44 px tall; the small nav button is about 36 px, above the 24 px WCAG 2.2 minimum.
- **Logos** are exempt from text-contrast rules (the Synapse gradient wordmark is an example).

---

## 8. Implementing it

### 8.1 Reference stack
Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · class-variance-authority + tailwind-merge (shadcn-style components) · `motion` for scroll reveal · `lucide-react` icons · ESLint. Fonts via `next/font`. The system itself is plain CSS custom properties plus small components, so it can be ported to any framework.

### 8.2 Folder layout (reference implementation)
```
src/
  stc-ui/        layer 1: shared (tokens.css, components, STC logo)
  <club>/        layer 2: theme.css, content.ts, sections, club logo
  app/           Next.js shell: layout.tsx (fonts, data-club), page.tsx, globals.css
  lib/utils.ts   class-name helper (aware of the STC token names)
```
`globals.css` imports in the required order: Tailwind, `stc-ui/tokens.css`, `<club>/theme.css`, then any event skin.

### 8.3 CSS variable reference
Runtime tokens (what themes and skins may set or read):

`--brand` · `--on-brand` · `--brand-hover` · `--brand-deep` · `--brand-end` · `--brand-tint` · `--brand-tint-2` · `--brand-line` · `--font-label` · `--label-case` · `--label-tracking` · `--stc-font-sans` · `--stc-font-mono` · `--nav-h` · `--gutter` · `--section-y`

Tailwind theme tokens (utilities such as `bg-brand-tint`, `text-ink`, `rounded-stc`, `shadow-stc-sm`, `max-w-stc`, `text-hero`): `--color-soft`, `--color-ink`, `--color-ink-2`, `--color-muted`, `--color-line`, `--color-on-dark-muted`, `--radius-stc`, `--radius-stc-lg`, `--shadow-stc-sm`, `--shadow-stc-md`, `--container-stc`, `--breakpoint-md`, `--text-hero`, `--text-h2`, `--text-lead`, `--text-label`.

### 8.4 Starting a new club site
1. Copy `src/stc-ui/` and `src/lib/utils.ts` unchanged. (Until a shared package exists, shared changes are made once and re-copied; do not fork the files.)
2. Load Outfit with `next/font`, exposing it as `--font-outfit`.
3. Create `src/<club>/theme.css` containing `[data-club="<club>"] { --brand: ...; }`, and put the club logo in `src/<club>/assets/`.
4. Import `tokens.css` then the theme in `globals.css`; set `data-club="<club>"` on `<html>`.
5. Write the page from the shared components, keeping all copy in one typed content file.
6. Check the contrast pairings in section 7 for the chosen accent.
7. For an event: add `src/<event>/skin.css` after the theme and set `data-event`.

---

## 9. Do and don't

| Do | Don't |
|---|---|
| Start nav and footer with the STC badge and the club lockup | Replace the STC badge with a sponsor logo |
| Pick one accent and let the tints derive from it | Hard-code extra colours or per-component hex values |
| Use the two-tone heading and eyebrow pill | Invent new heading styles |
| Keep 10 px radius and the shared shadows | Square or heavily rounded corners on cards and buttons |
| Put brand text only on white, `soft` or `--brand-tint` | Put brand text on `--brand-tint-2` or `--brand-end` |
| Keep all page copy in one typed file | Scatter copy across components |
| Use event skins for event personality | Change fonts or layout for an event |

---

## 10. Known gaps and roadmap

- Light theme only (the STC site is light only); no dark mode.
- One page template (club home) is built; the **event page template is specified in 5.2 but not yet built**.
- The shared layer is copied between projects; extracting it into a versioned package (for example an npm workspace `@stc/ui`) is the next step once a second club site exists.
- No design-token export for non-web tools (Figma variables) yet.
- Hex values for the wing accents are approximate readings of the live site, not an official palette.

## 11. Changelog

| Version | Date | Notes |
|---|---|---|
| 0.1 | 2026-11-05 | First draft: tokens, 11 components, club-home pattern, event-skin rules, accessibility baseline. Reference implementation built for Synapse |
