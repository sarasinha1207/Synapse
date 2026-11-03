# STC club websites: shared UI system and the Synapse site

Website UI/UX work for **Synapse** (the AI/ML club, TATVA wing, Student Technical Council, IIT Patna), plus the shared **STC UI** design system that keeps every STC club and event site looking like one family.

## Documentation (share these)

| Document | What it covers | Audience |
|---|---|---|
| [`docs/STC-UI.md`](docs/STC-UI.md) | The shared design system: tokens, components, page patterns, event skins, accessibility, how to start a new club site | Other clubs' web developers, STC web leads |
| [`docs/SYNAPSE-UI.md`](docs/SYNAPSE-UI.md) | Synapse's identity (logo, wordmark, blue accent), site structure, content, pre-publish checklist | Synapse team, anyone building a Synapse event site |

## Repository layout

```
.
├── docs/
│   ├── STC-UI.md          shared design system (layer 1 spec)
│   └── SYNAPSE-UI.md      Synapse identity and site spec (layer 2 spec)
├── synapse-web/           the Synapse website: a Next.js app with its own package.json
│   ├── src/
│   │   ├── stc-ui/        shared layer: tokens + components (do not edit per club)
│   │   ├── synapse/       Synapse layer: theme, content, sections, logo
│   │   ├── app/           Next.js shell: layout, page, global CSS
│   │   └── lib/           small helpers
│   ├── package.json       dependencies pinned to exact versions
│   └── README.md          app-level notes
├── .editorconfig          editor settings (UTF-8, LF, 2 spaces)
├── .gitattributes         line-ending and binary-file rules
├── .gitignore             node_modules, build output, env files, OS/editor files
└── README.md              this file
```

Future club or event sites go beside `synapse-web/` (for example `evidence-404-web/`), each starting from a copy of `src/stc-ui/` (see `docs/STC-UI.md`, section 8.4).

## Quick start

Requires Node.js 20.9 or newer.

```bash
cd synapse-web
npm install
npm run dev
```

Open <http://localhost:3000>.

| Command (run inside `synapse-web/`) | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (downloads the Google fonts once, so it needs internet) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Conventions

- **Three layers.** STC UI (shared) -> club theme (one accent colour, logo, copy) -> optional event skin. Details and the exact rules are in `docs/STC-UI.md`.
- **One accent per club.** Set `--brand` in the club's `theme.css`; every tint, hover and gradient derives from it. Do not hard-code other colours.
- **Do not fork the shared layer.** Fix or improve `src/stc-ui/` once and re-copy it, so all clubs stay identical.
- **Copy lives in one typed file** (`src/synapse/content.ts`). Anything marked `PLACEHOLDER` is draft text.
- **Pinned dependencies.** `package.json` uses exact versions and `package-lock.json` is committed. Upgrade deliberately, then run build, lint and typecheck.
- **Never commit** `node_modules/`, `.next/`, or `.env*` files (all ignored).

## Status

Draft v0.1. The Synapse home page is built and verified (desktop and phone widths, keyboard menu, reduced-motion, contrast). Still to do before publishing is listed in `docs/SYNAPSE-UI.md`, section 9: real copy, join-form link, Synapse contact links, a larger emblem, favicon and share image, and a hosting decision. No licence has been chosen yet.
