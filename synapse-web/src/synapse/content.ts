/**
 * All Synapse page copy lives here, typed, so editing text never means touching components.
 * Anything marked PLACEHOLDER is draft text to replace before publishing.
 */
import type { Fact } from "@/stc-ui/facts-strip";
import type { FooterColumn, FooterContact } from "@/stc-ui/site-footer";
import type { NavLink } from "@/stc-ui/site-nav";
import type { Stage } from "@/stc-ui/timeline";

export const club = {
  name: "Synapse",
  tagline: "The AI/ML Club",
  homeLabel: "Synapse, the AI/ML Club: home",
  topLabel: "Synapse, back to top",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "#top", current: true },
  { label: "About", href: "#about" },
  { label: "What we do", href: "#activities" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export const joinCta = { label: "Join Synapse", href: "#join" };

export const hero = {
  eyebrow: "AI · ML · Deep Learning Club",
  // PLACEHOLDER headline: edit freely.
  before: "Learn AI by ",
  accent: "building it",
  lead:
    "Synapse is the AI, ML and deep learning club of the Student Technical Council, IIT Patna. " +
    "We explore artificial intelligence and machine learning through hands-on projects and research.",
  primary: joinCta,
  secondary: { label: "See events", href: "#events" },
  emblemAlt: "Synapse emblem: a brain drawn half as an outline and half as a neural network",
};

export const about = {
  eyebrow: "About us",
  before: "Exploring intelligence, ",
  accent: "one model at a time",
  intro:
    "Synapse is a club under TATVA, the Technology & Research wing of the Student Technical Council, " +
    "IIT Patna Hybrid Programs.",
  // PLACEHOLDER: add 2-3 sentences on the club's story, who it is for, and what members get.
  placeholder: "[Add the club's story here: who Synapse is for, what members build, how to take part.]",
  facts: [
    { label: "Council", value: "Student Technical Council, IIT Patna Hybrid Programs" },
    { label: "Wing", value: "TATVA · Technology & Research Cell" },
    { label: "Focus", value: "AI, machine learning & deep learning" },
  ] satisfies Fact[],
};

export interface Activity {
  icon: "cpu" | "layers" | "network";
  title: string;
  description: string;
}

export const activitiesSection = {
  eyebrow: "What we do",
  before: "Learn it, build it, ",
  accent: "break it",
  // PLACEHOLDER: the three titles come from the STC site's Synapse listing; the descriptions are draft.
  description: "Hands-on work across the AI stack. (Draft descriptions: edit to match what Synapse actually runs.)",
};

export const activities: Activity[] = [
  {
    icon: "cpu",
    title: "AI / ML projects",
    description: "Build real projects from first model to something you can show, with mentors and peers.",
  },
  {
    icon: "layers",
    title: "Deep learning",
    description: "Work through the ideas behind modern models, with code alongside every concept.",
  },
  {
    icon: "network",
    title: "Neural networks",
    description: "Understand how networks learn by training them, tuning them and watching them fail.",
  },
];

/** PLACEHOLDER: the whole featured-event block is sample content. */
export const featuredEvent = {
  eyebrow: "Featured event",
  before: "Next up: ",
  accent: "Event name",
  description: "One or two sentences on what the event is and who it is for.",
  facts: [
    { label: "Format", value: "Online / On campus" },
    { label: "Duration", value: "N days" },
    { label: "Participation", value: "Individual / Team" },
    { label: "Registration", value: "DD MMM – DD MMM YYYY" },
  ] satisfies Fact[],
  stages: [
    { tag: "Stage 01", title: "Stage title", description: "Describe what happens at this stage." },
    { tag: "Stage 02", title: "Stage title", description: "Describe what happens at this stage." },
    { tag: "Stage 03", title: "Stage title", description: "Describe what happens at this stage." },
  ] satisfies Stage[],
};

export const join = {
  title: "Ready to build with Synapse?",
  description: "Come to an event, join a project, or just say hello. Everyone starts somewhere.",
  // TODO: point "Get involved" at the real join / registration form.
  primary: { label: "Get involved", href: "#contact" },
  secondary: { label: "Explore TATVA", href: "https://www.stciitphybrid.in/wings/tatva" },
};

export const footer = {
  blurb: "A TATVA sub-club of the Student Technical Council, IIT Patna Hybrid Programs.",
  columns: [
    {
      title: "Synapse",
      links: [
        { label: "About", href: "#about" },
        { label: "What we do", href: "#activities" },
        { label: "Events", href: "#events" },
        { label: "Join", href: "#join" },
      ],
    },
    {
      title: "STC",
      links: [
        { label: "Student Technical Council", href: "https://www.stciitphybrid.in/" },
        { label: "TATVA wing", href: "https://www.stciitphybrid.in/wings/tatva" },
        { label: "STC events", href: "https://www.stciitphybrid.in/events" },
        { label: "STC on Instagram", href: "https://www.instagram.com/stc_iitp_cet/" },
        {
          label: "STC on LinkedIn",
          href: "https://www.linkedin.com/company/stc-iitp-hybrid-programs/posts/?feedView=all",
        },
      ],
    },
  ] satisfies FooterColumn[],
  // TODO: add Synapse's own email and social links. Address, TATVA and STC emails come from stciitphybrid.in.
  contact: {
    title: "Contact",
    lines: [
      { text: "IIT Patna, Bihta, Patna - 801106" },
      { text: "tatva@iitp.ac.in", href: "mailto:tatva@iitp.ac.in", note: "TATVA" },
      { text: "stc_iitp@iitp.ac.in", href: "mailto:stc_iitp@iitp.ac.in", note: "STC" },
    ],
  } satisfies FooterContact,
};
