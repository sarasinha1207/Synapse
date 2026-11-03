/**
 * Doubt-form types and validation. Pure functions with no React or Next imports,
 * so they can be reused by the server action and tested on their own.
 */
import { doubtTopics } from "../content/contact";

export interface DoubtValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export type DoubtField = keyof DoubtValues;
export type DoubtErrors = Partial<Record<DoubtField, string>>;

/** What the form shows after each submit. `values` lets the form refill itself when something needs fixing. */
export interface DoubtState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: DoubtErrors;
  values?: DoubtValues;
}

export const limits = { nameMin: 2, nameMax: 80, emailMax: 120, messageMin: 10, messageMax: 2000 } as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Keeps tabs, newlines and printable text; drops other control characters; trims the ends. */
function clean(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 0;
    if (code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127)) out += ch;
  }
  return out.replace(/\r\n?/g, "\n").trim();
}

export function readDoubt(formData: FormData): DoubtValues {
  return {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    topic: clean(formData.get("topic")),
    message: clean(formData.get("message")),
  };
}

export function validateDoubt(values: DoubtValues): DoubtErrors {
  const errors: DoubtErrors = {};

  if (values.name.length < limits.nameMin) errors.name = "Enter your name (at least 2 characters).";
  else if (values.name.length > limits.nameMax) errors.name = `Keep your name under ${limits.nameMax} characters.`;

  if (!values.email) errors.email = "Enter your email so we can reply.";
  else if (values.email.length > limits.emailMax || !EMAIL_PATTERN.test(values.email))
    errors.email = "Enter a valid email address, like name@example.com.";

  if (!doubtTopics.some((topic) => topic.value === values.topic)) errors.topic = "Choose what your doubt is about.";

  if (values.message.length < limits.messageMin)
    errors.message = "Describe your doubt in a little more detail (at least 10 characters).";
  else if (values.message.length > limits.messageMax)
    errors.message = `Please shorten your doubt to ${limits.messageMax} characters or fewer.`;

  return errors;
}
