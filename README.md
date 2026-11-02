# STC club UI (draft) + Synapse starter page

One design system for every STC club site and every event site, in three layers.

```
stc-club-ui/
  tokens.css        layer 1  shared tokens (fonts, greys, radius, shadows, spacing, --brand)
  components.css    layer 1  shared components (nav, eyebrow, cards, facts, timeline, CTA, footer)
synapse/
  synapse.theme.css layer 2  Synapse's accent: sets ONE token, --brand
  index.html        Synapse home page (starter)
```

Layer 3 (event skins) doesn't exist yet. When an event site is built it adds one more file, e.g. `events/<name>.skin.css`.

## Try it

Open `synapse/index.html` in any browser (double-click). No build step. It loads Outfit from Google Fonts, so it needs internet for the font.

## The rules that keep everything consistent

| Layer | May change | May NOT change |
|---|---|---|
| Club theme | `--brand` | everything else |
| Event skin | `--brand`, `--font-label`, `--label-case`, `--label-tracking` | body/heading font, radius, spacing, layout, components |

- **Load order is the whole mechanism:** `tokens.css` → `components.css` → club theme → event skin. Keep theme/skin selectors at specificity (0,1,0) (`[data-club="x"]`, `[data-event="x"]`) so a later file wins by order.
- Put `data-club` and (on event pages) `data-event` on `<html>`.
- Every tint, hover and gradient is derived from `--brand` with `color-mix()`, so you never pick a second colour.
- **Contrast:** brand text is safe on white and on `--brand-tint`. Keep `--brand` lightness ≤ ~0.56 so white button text stays ≥ 4.5:1. Don't put brand text on `--brand-tint-2`.

### Event skin example (5 lines)

```css
/* events/evidence-404.skin.css  -- load AFTER the club theme */
[data-event="evidence-404"] {
  --brand: oklch(0.5 0.27 293);
  --font-label: var(--font-mono);   /* also load JetBrains Mono */
  --label-tracking: 0.12em;
}
```

## Still placeholder: replace before publishing

- **Logo:** the lockup mark in the nav and footer is a generic stand-in (search `TODO` in `index.html`).
- **Accent colour:** `oklch(0.55 0.24 330)` (≈ `#b716b2`) is a placeholder. Take the real colour from the Synapse logo. It was picked to avoid STC blue, DISHA red, ARTHNITI orange, TATVA teal and WebWiser violet.
- **Copy:** hero headline, "What we do" descriptions and the About paragraph are draft text. The featured-event block is all placeholder ("Event name", "DD MMM").
- **Links:** "Get involved" has no real join form yet. Synapse's own email and social links are missing from the footer. The TATVA and STC emails, STC social links and address are taken from stciitphybrid.in.

## Porting to Next.js + Tailwind v4 (the STC site's stack, inferred)

**Untested sketch, not verified.** Copy `tokens.css` as-is and map the colours you want as Tailwind utilities:

```css
@import "tailwindcss";
@import "./stc-club-ui/tokens.css";
@theme inline {
  --color-brand: var(--brand);
  --color-brand-tint: var(--brand-tint);
  --color-ink: var(--ink);
}
```

`components.css` can stay as plain CSS or be translated class-by-class into React components. Check that `font-sans` picks up Outfit after porting; `tokens.css` defines `--font-sans`, but I haven't confirmed how Tailwind resolves it.

## Not done

- No dark mode (the STC site is light-only).
- Only a single page: no Team, Events list or Projects pages yet.
- Checked in Chromium at 1280 px and 375 px wide. Not tested in Safari/Firefox. `color-mix()` and `oklch()` need browsers from roughly 2023 onward.
