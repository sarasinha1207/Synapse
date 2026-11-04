/**
 * Resources page data: every shared document (study material, revision material, quizzes, roadmaps, cheat sheets).
 *
 * WHERE THE FILES LIVE
 *   Put each PDF in  synapse-web/public/resources/  and it is served at  /resources/<file name>.
 *   Use file names without spaces (Supervised_Learning_Revision_Guide.pdf).
 *
 * HOW TO ADD A DOCUMENT
 *  1. Copy the PDF into public/resources/.
 *  2. Copy an entry below and change it:
 *       title         the heading shown on the card
 *       fileName      the full file name, e.g. "Roadmap.pdf" (must match the file in public/resources/)
 *       category      one of the fixed categories below
 *       date          the date it was provided, "YYYY-MM-DD"
 *       viewHref      the Google Drive link that opens the document in a new tab (leave it out until you have it:
 *                     the View button is then dimmed and does nothing)
 *       downloadHref  "/resources/<fileName>"
 *       leaderboardHref  optional; add it for quizzes that have a leaderboard
 *  3. Newest first is the usual order, but the order here is the order on the page.
 */

/** The fixed categories. To add one later, add a line here (the filter picks it up automatically). */
export const resourceCategories = [
  { id: "study", label: "Study material" },
  { id: "revision", label: "Revision material" },
  { id: "quiz", label: "Quiz" },
  { id: "roadmap", label: "Roadmap" },
  { id: "cheatsheet", label: "Cheat sheet" },
] as const;

export type ResourceCategoryId = (typeof resourceCategories)[number]["id"];

export interface ResourceItem {
  title: string;
  fileName: string;
  category: ResourceCategoryId;
  date: string;
  viewHref?: string;
  downloadHref: string;
  leaderboardHref?: string;
  sample?: boolean;
}

export const resourcesHeader = {
  eyebrow: "Resources",
  before: "Everything we share, ",
  accent: "in one place",
  lead: "Study material, revision guides, quizzes, roadmaps and cheat sheets. Filter by type, view a document online, or download it.",
};

export const resourcesList = {
  eyebrow: "Documents",
  before: "Browse ",
  accent: "resources",
  description: "Pick a category to narrow the list.",
};

// The two documents provided so far. The dates are the files' own "last modified" dates: change them to the day
// each one was actually shared. TODO: add the Google Drive link as `viewHref` on each.
export const resourceItems: ResourceItem[] = [
  {
    title: "Supervised Learning Revision Guide",
    fileName: "Supervised_Learning_Revision_Guide.pdf",
    category: "revision",
    date: "2026-10-14",
    downloadHref: "/resources/Supervised_Learning_Revision_Guide.pdf",
  },
  {
    title: "Python and Libraries Revision Guide",
    fileName: "Python_and_Libraries_Revision_Guide.pdf",
    category: "revision",
    date: "2026-10-14",
    downloadHref: "/resources/Python_and_Libraries_Revision_Guide.pdf",
  },
];

export const resourcesHelp = {
  title: "Stuck on something?",
  description: "Send us your doubt and a Synapse member will reply by email.",
  action: { label: "Ask a doubt", href: "/contact" },
};
