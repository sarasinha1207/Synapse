import { CalendarDays, Download, ExternalLink, FileText, Trophy, type LucideIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export type ItemIcon = "open" | "download" | "file" | "leaderboard" | "register";

const icons: Record<ItemIcon, LucideIcon> = {
  open: ExternalLink,
  download: Download,
  file: FileText,
  leaderboard: Trophy,
  register: CalendarDays,
};

export interface ItemAction {
  label: string;
  /** Leave empty while the link doesn't exist yet: the card then shows "link coming soon" instead of a dead button. */
  href?: string;
  icon?: ItemIcon;
  variant?: "primary" | "secondary";
}

export interface ItemCardProps {
  title: string;
  description: string;
  /** Small coloured pill: a status ("Upcoming") or a type ("PDF"). */
  tag?: string;
  /** Plain facts under the title, joined with dots: date, format, duration... */
  meta?: string[];
  /** Marks draft content so it can't be mistaken for real content. Remove the flag when the item is real. */
  sample?: boolean;
  actions?: ItemAction[];
}

/** One action: a small button, or a muted "link coming soon" note when there is no href yet. */
export function ActionLink({ action }: { action: ItemAction }) {
  const Icon = icons[action.icon ?? "open"];

  if (!action.href) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-muted">
        <Icon aria-hidden className="size-4" />
        {action.label}: link coming soon
      </span>
    );
  }

  const external = /^https?:\/\//.test(action.href);
  return (
    <Button href={action.href} external={external} size="sm" variant={action.variant ?? "secondary"}>
      <Icon aria-hidden className="size-4" />
      {action.label}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </Button>
  );
}

/** A titled card with facts and action buttons. Used for events, shared materials and quizzes. */
export function ItemCard({ title, description, tag, meta, sample, actions }: ItemCardProps) {
  return (
    <Card className="flex h-full flex-col gap-3">
      {tag || sample ? (
        <div className="flex flex-wrap items-center gap-2">
          {tag ? (
            <span className="stc-label rounded-full bg-brand-tint px-2.5 py-1 text-label font-semibold text-brand">
              {tag}
            </span>
          ) : null}
          {sample ? (
            <span className="stc-label rounded-full border border-field px-2.5 py-1 text-label font-medium text-muted">
              Sample
            </span>
          ) : null}
        </div>
      ) : null}
      <h3 className="text-xl leading-tight font-bold text-ink">{title}</h3>
      {meta?.length ? <p className="text-sm text-muted">{meta.join(" · ")}</p> : null}
      <p className="text-[0.9375rem] text-muted">{description}</p>
      {actions?.length ? (
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3">
          {actions.map((action) => (
            <ActionLink key={action.label} action={action} />
          ))}
        </div>
      ) : null}
    </Card>
  );
}
