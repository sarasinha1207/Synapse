/**
 * Home page copy: hero, About, Key focus areas, Events.
 * Facts come from the Synapse page on stciitphybrid.in. Wording marked DRAFT is ours: confirm or edit it.
 */
import type { Fact } from "@/stc-ui/facts-strip";
import type { ItemCardProps } from "@/stc-ui/item-card";

export const hero = {
  eyebrow: "AI · ML · Deep Learning Club",
  // DRAFT headline.
  before: "Learn AI by ",
  accent: "building it",
  lead:
    "Synapse is the AI, machine learning and deep learning club of the Student Technical Council, IIT Patna. " +
    "Learn the ideas, build projects, and revise together.",
  primary: { label: "Explore resources", href: "/resources" },
  secondary: { label: "Ask a doubt", href: "/contact" },
  emblemAlt: "Synapse emblem: a brain drawn half as an outline and half as a neural network",
};

export const about = {
  eyebrow: "About us",
  before: "Exploring intelligence, ",
  accent: "one model at a time",
  paragraphs: [
    // Fact: Synapse is the AI/ML/DL club of the TATVA wing of STC (stciitphybrid.in).
    "Synapse is the AI, machine learning and deep learning club of the Student Technical Council (STC) at IIT Patna, " +
      "part of TATVA, the Technology & Research wing.",
    // DRAFT: built from the STC page ("beginner or expert", hands-on projects) and the club's resources and quizzes.
    "We are a community for anyone curious about how intelligent systems work, from first-time learners to experienced " +
      "builders. Members learn core concepts together, work on hands-on projects, and keep their knowledge sharp " +
      "through shared revision material and regular quizzes.",
  ],
  facts: [
    { label: "Council", value: "Student Technical Council, IIT Patna Hybrid Programs" },
    { label: "Wing", value: "TATVA · Technology & Research Cell" },
    { label: "Focus", value: "AI, machine learning & deep learning" },
  ] satisfies Fact[],
};

export type FocusIcon = "cpu" | "network" | "flask" | "checklist";

export interface FocusArea {
  icon: FocusIcon;
  title: string;
  description: string;
}

export const focus = {
  eyebrow: "Key focus areas",
  before: "What we ",
  accent: "focus on",
  description: "Four areas shape everything Synapse does.",
  // The first three titles come from the STC page's key activities (AI/ML projects, deep learning, neural networks).
  // The descriptions are DRAFT. "Revision & practice" reflects the Resources page.
  items: [
    {
      icon: "cpu",
      title: "AI & machine learning",
      description: "The core ideas of learning from data: how models are trained, tested and improved.",
    },
    {
      icon: "network",
      title: "Deep learning",
      description: "How neural networks learn, from a single neuron to modern architectures.",
    },
    {
      icon: "flask",
      title: "Projects & research",
      description: "Turning concepts into working projects, with room to explore research topics.",
    },
    {
      icon: "checklist",
      title: "Revision & practice",
      description: "Shared revision material and regular quizzes with leaderboards, so learning sticks.",
    },
  ] satisfies FocusArea[],
};

export const events = {
  eyebrow: "Events",
  before: "Join our next ",
  accent: "event",
  description: "Workshops, talks, quizzes and competitions run by Synapse.",
  // PLACEHOLDER: every entry below is sample content (it shows a "Sample" tag). Replace with real events, and
  // delete `sample: true`. Leave an action's `href` out until the link exists.
  items: [
    {
      title: "Event name",
      tag: "Upcoming",
      meta: ["DD MMM YYYY", "Online / On campus"],
      description: "One or two sentences on what the event is and who it is for.",
      sample: true,
      actions: [{ label: "Register", icon: "register", variant: "primary" }],
    },
    {
      title: "Past event name",
      tag: "Past",
      meta: ["DD MMM YYYY", "Online"],
      description: "A short recap of what happened and what was covered.",
      sample: true,
      actions: [{ label: "View recap", icon: "open" }],
    },
    {
      title: "Past event name",
      tag: "Past",
      meta: ["DD MMM YYYY", "On campus"],
      description: "A short recap of what happened and what was covered.",
      sample: true,
      actions: [{ label: "View recap", icon: "open" }],
    },
  ] satisfies ItemCardProps[],
  resourcesPrompt: "Looking for notes or past quizzes?",
  resourcesLink: { label: "Visit Resources", href: "/resources" },
};
