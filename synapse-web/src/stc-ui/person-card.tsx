import { Card } from "./card";
import { cn } from "@/lib/utils";

interface PersonCardProps {
  name: string;
  /** For example "Coordinator" or "Member". */
  position: string;
  /** Fill the avatar with the brand colour. Used for the people who lead the club. */
  highlight?: boolean;
}

/** Up to two capital letters from a name: first and last word ("Md Huzaifa Ansari" -> "MA"). */
function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * A team member: initials avatar (swap for a photo later), name and position.
 * The avatar is decorative: the name and position beside it say everything.
 */
export function PersonCard({ name, position, highlight = false }: PersonCardProps) {
  return (
    <Card interactive={false} className="flex h-full items-center gap-4 p-5">
      <span
        aria-hidden
        className={cn(
          "grid size-14 flex-none place-items-center rounded-full text-lg font-bold",
          highlight ? "bg-brand text-on-brand" : "bg-brand-tint text-brand",
        )}
      >
        {initials(name)}
      </span>
      <div className="min-w-0">
        <h3 className="text-lg leading-snug font-bold text-ink">{name}</h3>
        <p
          className={cn(
            "stc-label mt-1.5 inline-block rounded-full px-3 py-1 text-label font-semibold",
            highlight ? "bg-brand-tint text-brand" : "bg-soft text-muted",
          )}
        >
          {position}
        </p>
      </div>
    </Card>
  );
}
