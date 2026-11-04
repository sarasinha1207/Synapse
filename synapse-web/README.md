# synapse-web

The Synapse club website: a Next.js app built on the shared STC UI layer. It has four pages.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · class-variance-authority + tailwind-merge · motion · lucide-react · ESLint.

## Pages

| Route | Page | What is on it |
|---|---|---|
| `/` | Home | Hero, **About**, **Key focus areas**, **Events** preview, **Where we belong** (STC and TATVA) |
| `/events` | Events | Upcoming and past webinars: heading, about, speaker, date, time, platform |
| `/resources` | Resources | A category filter and document cards: heading, file name, category, date, **View** and **Download** |
| `/contact` | Contact Us | A form for submitting doubts, plus other ways to reach the club |

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
  app/        Next.js shell: layout.tsx (fonts, data-club, nav + footer), one folder per route
  stc-ui/     shared layer: tokens.css + components + STC logo. Do not edit per club.
  synapse/    Synapse layer
    content/    all copy and data, typed: site.ts, home.ts, events.ts, resources.ts, contact.ts
    home/       Hero, About, Key focus areas, Events preview, Where we belong
    events/     Upcoming and past events
    resources/  The filterable document list, help band
    contact/    doubt form, server-side validation, server action
    theme.css   --brand (the accent colour)
  lib/        utils.ts (class-name helper), format.ts (dates and times, India time)
public/
  resources/  the shared PDFs, served at /resources/<file name>
integrations/
  google-sheets/  Apps Script + steps for sending doubts to a Google Sheet
```

## Everyday tasks

- **Change text:** edit the file for that page in `src/synapse/content/`. Anything marked `DRAFT` or `PLACEHOLDER` is draft copy to confirm.
- **Add a document:** copy the PDF into `public/resources/` (file name without spaces), then copy an entry in `content/resources.ts`: set `title`, `fileName`, `category` (study, revision, quiz, roadmap or cheatsheet), `date`, `viewHref` (the Google Drive link, opens in a new tab) and `downloadHref` (`/resources/<fileName>`). Until `viewHref` exists the card says "View: link coming soon". A quiz can also get a `leaderboardHref`.
- **Add an event:** copy an entry in `content/events.ts` and set `startsAt` (for example `2026-12-15T18:00:00+05:30`). Delete `sample: true` to remove the "Sample" tag. Upcoming or past is worked out automatically.
- **Add a category:** one line in `resourceCategories` in `content/resources.ts`; the filter picks it up.
- **Change the accent colour:** edit the single `--brand` line in `src/synapse/theme.css`, then re-check contrast (`../docs/SYNAPSE-UI.md`, section 3.3).
- **Replace a logo:** overwrite the file in `src/stc-ui/assets/` or `src/synapse/assets/` and keep the file name.
- **Add an event skin:** `../docs/STC-UI.md`, section 6.

## Contact form: where doubts go

The form on `/contact` checks the details on the server and then forwards each doubt as JSON to a URL you choose. **The site stores nothing itself, and until you set that URL the form tells visitors it is not switched on yet and shows the TATVA email instead.**

1. Copy `.env.example` to `.env.local` (never committed) and set `DOUBTS_WEBHOOK_URL=` to your destination. Restart `npm run dev` after any change (removing the line also needs a restart).
2. On a host (Vercel, Netlify...) set the same variable in the project's environment settings.

Each doubt arrives as:

```json
{ "name": "...", "email": "...", "topic": "concept | quiz | material | event | other",
  "message": "...", "submittedAt": "2026-11-05T10:00:00.000Z", "source": "synapse-web" }
```

**Google Sheets:** a ready-to-paste Apps Script and click-by-click steps are in [`integrations/google-sheets/`](integrations/google-sheets/README.md). It has to be set up in the club's own Google account. The website side was tested against a local imitation of Apps Script's replies; the script itself has not been run against Google.

Anyone who learns the destination URL can post to it, so keep it in the environment variable only.

**Behaviour notes**

- Needs a Node host. A static export (`output: "export"`) cannot run the form.
- Spam protection is a hidden field that people never see (bots tend to fill it; those submissions are dropped silently) plus length limits. There is no rate limiting or CAPTCHA.
- Google Apps Script always answers HTTP 200 and reports its own errors in a JSON body, so the form treats a reply of `{"ok": false}` as a failure too (tested).
- Failures are logged without the visitor's details (only the reason, for example `fetch failed`).
- Tested against a local stand-in destination: empty form, partly invalid input (the chosen topic is kept), a valid doubt (delivered once, with the right JSON), a bot submission (not delivered), destination unreachable, and no destination configured.

## Design rules and specs

The rules live in the docs, not here, so they stay in one place:

- [`../docs/STC-UI.md`](../docs/STC-UI.md): tokens, components, page patterns, accessibility
- [`../docs/SYNAPSE-UI.md`](../docs/SYNAPSE-UI.md): Synapse identity, the three pages, pre-publish checklist

Quick reminder: load order is `tokens.css` -> club theme -> event skin, and theme/skin selectors must stay at specificity (0,1,0).
