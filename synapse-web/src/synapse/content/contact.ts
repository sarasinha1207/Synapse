/** Contact Us page copy: the doubt form and the "other ways to reach us" card. */
import { reach } from "./site";

export const contactHeader = {
  eyebrow: "Contact us",
  before: "Got a doubt? ",
  accent: "Ask us",
  lead: "Stuck on a concept, a quiz question or a shared material? Send it here and a Synapse member will reply by email.",
};

/** The topics people can pick. `value` is what is sent to you; `label` is what people see. */
export const doubtTopics = [
  { value: "concept", label: "A concept (AI, ML or deep learning)" },
  { value: "quiz", label: "A quiz or its leaderboard" },
  { value: "material", label: "Shared revision material" },
  { value: "event", label: "An event" },
  { value: "other", label: "Something else" },
] as const;

const fallbackEmail = reach.emails[0].email;

export const doubtForm = {
  title: "Submit a doubt",
  fields: {
    name: { label: "Your name" },
    email: { label: "Your email", hint: "We will reply to this address." },
    topic: { label: "What is it about?", placeholder: "Choose a topic" },
    message: {
      label: "Your doubt",
      hint: "Be as specific as you can: what you tried and where you got stuck.",
    },
  },
  submit: "Send doubt",
  sending: "Sending…",
  // DRAFT: confirm this matches how the club really handles the details people send.
  privacy: "Your name and email are used only to reply to your doubt.",
  messages: {
    success: "Thanks! Your doubt has been sent. A Synapse member will reply by email.",
    validation: "Some details need fixing. Please check the highlighted fields.",
    notConfigured: `Doubt submissions are not switched on yet. Please email us at ${fallbackEmail} instead.`,
    deliveryFailed: `We could not send your doubt just now. Please try again, or email us at ${fallbackEmail}.`,
  },
};

export const contactAside = {
  title: "Other ways to reach us",
  beforeAsking: {
    text: "Your answer may already be in our shared notes or past quizzes.",
    link: { label: "Browse Resources", href: "/resources" },
  },
};
