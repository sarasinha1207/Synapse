/**
 * Home page copy: hero, About, Key focus areas, Events preview, and "Synapse inside TATVA".
 * Facts come from the Synapse, TATVA and home pages on stciitphybrid.in (paraphrased). Wording marked DRAFT is ours.
 * Events themselves live in events.ts.
 */
import type { Fact } from "@/stc-ui/facts-strip";

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
      description: "Shared revision material and regular quizzes, so learning sticks.",
    },
  ] satisfies FocusArea[],
};

/** The Events preview on the home page: the next few upcoming events from events.ts. */
export const eventsPreview = {
  eyebrow: "Events",
  before: "Join our next ",
  accent: "event",
  description: "Webinars and talks run by Synapse.",
  limit: 3,
  empty: "No upcoming events right now. See what we have run before.",
  allLink: { label: "See all events", href: "/events" },
};

/** Last section of the home page: where Synapse sits inside TATVA and STC. */
export const belonging = {
  eyebrow: "Where we belong",
  before: "Synapse is part of ",
  accent: "TATVA",
  description: "TATVA is the technology and research wing of the Student Technical Council (STC) at IIT Patna.",
  stc: {
    title: "Student Technical Council",
    subtitle: "IIT Patna Hybrid Programs",
    text:
      "STC is a reimagined, upgraded version of the former Technology Club: a central, well-structured platform " +
      "for the academic and professional goals of students.",
    stats: [
      { value: "3", label: "wings" },
      { value: "24+", label: "sub-clubs" },
    ],
    wings: [
      { name: "DISHA", role: "Career Growth and Training Cell" },
      { name: "ARTHNITI", role: "Entrepreneurship and Innovation Cell" },
      { name: "TATVA", role: "Technology and Research Cell", current: true },
    ],
    action: { label: "Visit the STC website", href: "https://www.stciitphybrid.in/" },
  },
  tatva: {
    title: "TATVA",
    subtitle: "Technology & Research Cell",
    text:
      "TATVA builds technical skill and a research mindset through workshops, seminars, hackathons and " +
      "collaborative research, connecting students with industry experts and tech communities.",
    domainsTitle: "Technology domains",
    domains: [
      "Web and mobile development",
      "Artificial intelligence & machine learning",
      "Data science & analytics",
      "Cybersecurity & ethical hacking",
      "Robotics & automation",
    ],
    clubsTitle: "TATVA sub-clubs",
    clubs: [
      { name: "WebWiser" },
      { name: "Pixelerate" },
      { name: "Appistry" },
      { name: "Analytical Arena" },
      { name: "Synapse", current: true },
      { name: "HackShield" },
      { name: "CodeRED" },
      { name: "Mech-X" },
      { name: "Tech Hub" },
    ],
    action: { label: "Explore TATVA", href: "https://www.stciitphybrid.in/wings/tatva" },
  },
};
