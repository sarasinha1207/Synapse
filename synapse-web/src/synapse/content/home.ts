/**
 * Home page copy: hero, About, Key focus areas, Events preview, and "Where we belong".
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
  /** Three short proof points under the buttons. They describe what the site really offers. */
  highlights: [
    { icon: "flask", label: "Hands-on projects" },
    { icon: "book", label: "Shared revision material" },
    { icon: "talks", label: "Webinars & quizzes" },
  ] as { icon: "flask" | "book" | "talks"; label: string }[],
  /** Small floating tags around the emblem. Facts from the STC site. */
  badges: ["TATVA wing", "STC · IIT Patna"],
  emblemAlt: "Synapse emblem: a brain drawn half as an outline and half as a neural network",
};

export const about = {
  eyebrow: "About us",
  factsTitle: "At a glance",
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

export type FocusIcon = "cpu" | "network" | "flask" | "checklist" | "code" | "vision" | "language" | "talks";

export interface FocusArea {
  icon: FocusIcon;
  title: string;
  description: string;
}

export const focus = {
  eyebrow: "Key focus areas",
  before: "What we ",
  accent: "focus on",
  description: "Eight areas shape everything Synapse does.",
  // The first three titles come from the STC page's key activities (AI/ML projects, deep learning, neural networks).
  // "Revision & practice", "Python & libraries" and "Webinars & talks" reflect what the club shares and runs.
  // DRAFT: all descriptions, and especially "Computer vision" and "Natural language processing": confirm the club
  // really covers them, or replace them with the topics it does cover.
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
      icon: "code",
      title: "Python & libraries",
      description: "The everyday toolkit of data and AI work, learned by writing real code.",
    },
    {
      icon: "vision",
      title: "Computer vision",
      description: "Teaching machines to understand images and video.",
    },
    {
      icon: "language",
      title: "Natural language processing",
      description: "How computers read, understand and generate human language.",
    },
    {
      icon: "flask",
      title: "Projects & research",
      description: "Turning concepts into working projects, with room to explore research topics.",
    },
    {
      icon: "talks",
      title: "Webinars & talks",
      description: "Sessions with speakers that connect classroom ideas to real-world practice.",
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

export type BelongingIcon = "council" | "wing" | "club";

/**
 * Last section of the home page: why STC and TATVA exist, and how Synapse completes that vision.
 * Purposes are paraphrased from the STC "About" text and the TATVA page on stciitphybrid.in.
 * The third card is DRAFT wording: confirm it says what the club wants to say.
 */
export const belonging = {
  eyebrow: "Where we belong",
  before: "Synapse is part of ",
  accent: "TATVA",
  description: "How the council, its technology wing and our club fit together.",
  cards: [
    {
      icon: "council",
      title: "Purpose of STC",
      text:
        "The Student Technical Council exists to give IIT Patna students one central, well-structured platform " +
        "for their academic and professional aspirations.",
    },
    {
      icon: "wing",
      title: "Purpose of TATVA",
      text:
        "TATVA, the technology and research wing, builds technical expertise and a research mindset, bridging " +
        "academic learning and real-world technology so students become future-ready technologists.",
    },
    {
      icon: "club",
      title: "How Synapse completes the vision",
      text:
        "AI and machine learning are among the technologies TATVA wants students to master. Synapse is where that " +
        "happens in practice: learning the ideas together, building projects, and revising through shared " +
        "material and quizzes.",
      highlight: true,
    },
  ] satisfies { icon: BelongingIcon; title: string; text: string; highlight?: boolean }[],
};
