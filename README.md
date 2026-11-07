# STC club websites: shared UI system and the Synapse site

Website UI/UX work for **Synapse** (the AI/ML club, TATVA wing, Student Technical Council, IIT Patna), plus the shared **STC UI** design system that keeps every STC club and event site looking like one family.

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
