# STC club websites: shared UI system and the Synapse site

Website UI/UX work for **Synapse** (the AI/ML club, TATVA wing, Student Technical Council, IIT Patna), plus the shared **STC UI** design system that keeps every STC club and event site looking like one family.

## Documentation (share these)

| Document | What it covers | Audience |
|---|---|---|
| [`docs/STC-UI.md`](docs/STC-UI.md) | The shared design system: tokens, components, page patterns, event skins, accessibility, how to start a new club site | Other clubs' web developers, STC web leads |
| [`docs/SYNAPSE-UI.md`](docs/SYNAPSE-UI.md) | Synapse's identity (logo, wordmark, blue accent), site structure, content, pre-publish checklist | Synapse team, anyone building a Synapse event site |

## The Synapse site: four pages

| Page | Route | Sections |
|---|---|---|
| Home | `/` | About, Key focus areas, Events preview, Where we belong (purpose of STC and TATVA, and Synapse's role) |
| Events | `/events` | Upcoming and past webinars (heading, about, speaker, date, time, platform) |
| Resources | `/resources` | A category filter and document cards (heading, file name, category, date, View and Download) |
| Contact Us | `/contact` | A form for submitting doubts |

## Repository layout

```
.
├── docs/
│   ├── STC-UI.md          shared design system (layer 1 spec)
│   └── SYNAPSE-UI.md      Synapse identity and site spec (layer 2 spec)
├── synapse-web/           the Synapse website: a Next.js app with its own package.json
│   ├── src/
│   │   ├── stc-ui/        shared layer: tokens + components (do not edit per club)
│   │   ├── synapse/       Synapse layer: theme, content (one file per page), page sections, logo
│   │   ├── app/           Next.js shell: layout plus one folder per page (/, /resources, /contact)
│   │   └── lib/           small helpers
│   ├── public/resources/  shared PDFs, served at /resources/<file name>
│   ├── integrations/      Google Sheets script and steps for the doubts form
│   ├── package.json       dependencies pinned to exact versions
│   └── README.md          app-level notes
├── package.json           shortcuts so npm run dev works from this folder
├── .editorconfig          editor settings (UTF-8, LF, 2 spaces)
├── .gitattributes         line-ending and binary-file rules
├── .gitignore             node_modules, build output, env files, OS/editor files
└── README.md              this file
```

Future club or event sites go beside `synapse-web/` (for example `evidence-404-web/`), each starting from a copy of `src/stc-ui/` (see `docs/STC-UI.md`, section 8.4).

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm run setup      # first time only: installs the app's packages
npm run dev
```

Open <http://localhost:3000>. These commands work from this folder; the same ones (without `setup`, use `npm install`) also work inside `synapse-web/`. Running `npm run dev` anywhere else fails with "Could not read package.json".

| Command | Purpose |
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
- **Copy lives in typed files, one per page** (`src/synapse/content/`). Anything marked `DRAFT` or `PLACEHOLDER` is draft text, and sample items show a "Sample" tag until you remove `sample: true`.
- **Pinned dependencies.** `package.json` uses exact versions and `package-lock.json` is committed. Upgrade deliberately, then run build, lint and typecheck.
- **Never commit** `node_modules/`, `.next/`, or `.env*` files (all ignored). `synapse-web/.env.example` shows the one setting the site needs.
- **Doubts form:** submissions go to the URL in `DOUBTS_WEBHOOK_URL`. Until it is set the form tells visitors it is not switched on yet. Step-by-step Google Sheets setup is in `synapse-web/integrations/google-sheets/README.md`.

## Status

Draft v0.3. All four pages are built and tested (desktop and phone widths, navigation, keyboard menu, the form's success, error, bot and failure cases, contrast). The content is still **sample or draft text**, and the doubts form has **no destination yet**. The full pre-publish list is in `docs/SYNAPSE-UI.md`, section 9. No licence has been chosen yet.
