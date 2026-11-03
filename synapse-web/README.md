# synapse-web

The Synapse club website: a Next.js app built on the shared STC UI layer. It has three pages.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · class-variance-authority + tailwind-merge · motion · lucide-react · ESLint.

## Pages

| Route | Page | What is on it |
|---|---|---|
| `/` | Home | Hero, **About**, **Key focus areas**, **Events** |
| `/resources` | Resources | **Revision material shared** and **Quizzes conducted**, each with leaderboard links |
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
    content/    all copy, typed: site.ts, home.ts, resources.ts, contact.ts
    home/       Hero, About, Key focus areas, Events
    resources/  Revision material shared, Quizzes conducted, help band
    contact/    doubt form, server-side validation, server action
    theme.css   --brand (the accent colour)
  lib/        utils.ts (class-name helper that knows the STC token names)
```

## Everyday tasks

- **Change text:** edit the file for that page in `src/synapse/content/`. Anything marked `DRAFT` or `PLACEHOLDER` is draft copy to confirm.
- **Add a shared document, a quiz or an event:** copy a sample entry in `content/resources.ts` (materials, quizzes) or `content/home.ts` (events), change the text, put the real link in `href`, and delete `sample: true` (that removes the "Sample" tag). While a link's `href` is missing, the card shows "link coming soon".
- **Leaderboard links:** each material, each quiz, and each section has a "Leaderboard" action. Fill its `href` with the leaderboard URL (for example a Google Sheet), or delete the action if there is none.
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

**Recipe: send doubts to a Google Sheet** (not tested against Google itself; the form side was tested against a local stand-in):

1. Create a Google Sheet with the header row `Time, Name, Email, Topic, Message`.
2. Extensions → Apps Script. Replace the code with:

   ```js
   function doPost(e) {
     const data = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSheet().appendRow([new Date(), data.name, data.email, data.topic, data.message]);
     return ContentService.createTextOutput("ok");
   }
   ```
3. Deploy → New deployment → type **Web app**, execute as **Me**, access **Anyone** → copy the web app URL → use it as `DOUBTS_WEBHOOK_URL`.

Anyone who learns that URL can post to it, so keep it in the environment variable only.

**Behaviour notes**

- Needs a Node host. A static export (`output: "export"`) cannot run the form.
- Spam protection is a hidden field that people never see (bots tend to fill it; those submissions are dropped silently) plus length limits. There is no rate limiting or CAPTCHA.
- Failures are logged without the visitor's details (only the reason, for example `fetch failed`).
- Tested against a local stand-in destination: empty form, partly invalid input (the chosen topic is kept), a valid doubt (delivered once, with the right JSON), a bot submission (not delivered), destination unreachable, and no destination configured.

## Design rules and specs

The rules live in the docs, not here, so they stay in one place:

- [`../docs/STC-UI.md`](../docs/STC-UI.md): tokens, components, page patterns, accessibility
- [`../docs/SYNAPSE-UI.md`](../docs/SYNAPSE-UI.md): Synapse identity, the three pages, pre-publish checklist

Quick reminder: load order is `tokens.css` -> club theme -> event skin, and theme/skin selectors must stay at specificity (0,1,0).
