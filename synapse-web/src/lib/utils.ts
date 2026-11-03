import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know our custom STC tokens. Without this it would
 * treat `text-hero` as a text *colour* and silently drop `text-ink` (or the
 * reverse) when both appear in one class list.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "h2", "lead", "label"] }],
      shadow: [{ shadow: ["stc-sm", "stc-md"] }],
      rounded: [{ rounded: ["stc", "stc-lg"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
