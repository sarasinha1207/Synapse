/**
 * Resources page copy and data: "Revision material shared" and "Quizzes conducted".
 *
 * HOW TO ADD A REAL ITEM
 *  1. Copy a sample entry, change the text.
 *  2. Put the real link in `href` on its actions (a Drive/PDF/slides link, or the leaderboard sheet).
 *     While `href` is missing the card shows "link coming soon" instead of a dead button.
 *  3. Delete `sample: true` (that removes the "Sample" tag).
 *  4. If an item has no leaderboard, delete its "Leaderboard" action.
 * Newest items first.
 */
import type { ItemAction, ItemCardProps } from "@/stc-ui/item-card";

export const resourcesHeader = {
  eyebrow: "Resources",
  before: "Everything we share, ",
  accent: "in one place",
  lead: "Revision material from our sessions and the quizzes we have run, each with a link to its leaderboard.",
};

interface ResourcesSection {
  eyebrow: string;
  before: string;
  accent: string;
  description: string;
  /** One link to the leaderboard(s) for the whole section, shown at the top right of the section. */
  leaderboard: ItemAction;
  items: ItemCardProps[];
}

export const materials: ResourcesSection = {
  eyebrow: "Study material",
  before: "Revision material ",
  accent: "shared",
  description: "Notes, slides and notebooks shared with members after our sessions.",
  leaderboard: { label: "Leaderboard", icon: "leaderboard" },
  // PLACEHOLDER: sample entries.
  items: [
    {
      title: "Revision notes: topic name",
      tag: "PDF",
      meta: ["Shared DD MMM YYYY", "Session name"],
      description: "A short summary of what these notes cover and who they are for.",
      sample: true,
      actions: [
        { label: "Open material", icon: "file", variant: "primary" },
        { label: "Leaderboard", icon: "leaderboard" },
      ],
    },
    {
      title: "Slides: session name",
      tag: "Slides",
      meta: ["Shared DD MMM YYYY", "Session name"],
      description: "The slides from the session, with the key ideas and worked examples.",
      sample: true,
      actions: [
        { label: "Open material", icon: "file", variant: "primary" },
        { label: "Leaderboard", icon: "leaderboard" },
      ],
    },
    {
      title: "Practice notebook: topic name",
      tag: "Notebook",
      meta: ["Shared DD MMM YYYY", "Topic name"],
      description: "A hands-on notebook to practise the topic. Run it yourself and experiment.",
      sample: true,
      actions: [
        { label: "Open material", icon: "file", variant: "primary" },
        { label: "Leaderboard", icon: "leaderboard" },
      ],
    },
  ],
};

export const quizzes: ResourcesSection = {
  eyebrow: "Practice",
  before: "Quizzes ",
  accent: "conducted",
  description: "Every quiz we have run, with its leaderboard so you can see how you did.",
  leaderboard: { label: "All leaderboards", icon: "leaderboard" },
  // PLACEHOLDER: sample entries.
  items: [
    {
      title: "Quiz name",
      tag: "Quiz",
      meta: ["DD MMM YYYY", "Topic name"],
      description: "What the quiz covered and how it was scored.",
      sample: true,
      actions: [{ label: "View leaderboard", icon: "leaderboard", variant: "primary" }],
    },
    {
      title: "Quiz name",
      tag: "Quiz",
      meta: ["DD MMM YYYY", "Topic name"],
      description: "What the quiz covered and how it was scored.",
      sample: true,
      actions: [{ label: "View leaderboard", icon: "leaderboard", variant: "primary" }],
    },
    {
      title: "Quiz name",
      tag: "Quiz",
      meta: ["DD MMM YYYY", "Topic name"],
      description: "What the quiz covered and how it was scored.",
      sample: true,
      actions: [{ label: "View leaderboard", icon: "leaderboard", variant: "primary" }],
    },
  ],
};

export const resourcesHelp = {
  title: "Stuck on something?",
  description: "Send us your doubt and a Synapse member will reply by email.",
  action: { label: "Ask a doubt", href: "/contact" },
};
