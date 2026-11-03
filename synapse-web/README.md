# synapse-web

The Synapse club website: a Next.js app built on the shared STC UI layer.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · class-variance-authority + tailwind-merge · motion · lucide-react · ESLint.

## Run

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (downloads the Outfit and Michroma Google fonts once, so it needs internet) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Source layout

```
src/
  stc-ui/     shared layer: tokens.css + components + STC logo. Do not edit per club.
  synapse/    Synapse layer: theme.css (--brand), content.ts (all copy), sections, logo
  app/        Next.js shell: layout.tsx (fonts, data-club), page.tsx, globals.css
  lib/        utils.ts (class-name helper that knows the STC token names)
```

## Everyday tasks

- **Change text:** edit `src/synapse/content.ts`. Anything marked `PLACEHOLDER` is draft copy.
- **Change the accent colour:** edit the single `--brand` line in `src/synapse/theme.css`, then re-check contrast (`../docs/SYNAPSE-UI.md`, section 3.3).
- **Replace a logo:** overwrite the file in `src/stc-ui/assets/` or `src/synapse/assets/` and keep the file name.
- **Add an event skin:** create `src/<event>/skin.css`, import it after the club theme in `src/app/globals.css`, and add `data-event="<event>"` to `<html>` (`../docs/STC-UI.md`, section 6).

## Design rules and specs

The rules live in the docs, not here, so they stay in one place:

- [`../docs/STC-UI.md`](../docs/STC-UI.md): tokens, components, page patterns, accessibility
- [`../docs/SYNAPSE-UI.md`](../docs/SYNAPSE-UI.md): Synapse identity, structure, pre-publish checklist

Quick reminder: load order is `tokens.css` -> club theme -> event skin, and theme/skin selectors must stay at specificity (0,1,0).
