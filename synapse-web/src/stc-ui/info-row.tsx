import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  /** Show only the icon and the value. The label is still read aloud by screen readers. */
  iconOnly?: boolean;
  children: ReactNode;
}

/**
 * One fact with an icon, used inside cards (Speaker, Date, Platform, file name...).
 * Must sit inside a <dl>. The icon sits in a small brand-tinted tile; the label sits above the value,
 * or is hidden visually when `iconOnly` is set.
 */
export function InfoRow({ icon: Icon, label, iconOnly = false, children }: InfoRowProps) {
  return (
    <div className={cn("flex gap-3.5 text-[0.9375rem]", iconOnly ? "items-center" : "items-start")}>
      <span className="grid size-9 flex-none place-items-center rounded-stc bg-brand-tint text-brand">
        <Icon aria-hidden className="size-[1.125rem]" />
      </span>
      <div className="min-w-0">
        <dt className={cn("stc-label text-label font-medium text-muted", iconOnly && "sr-only")}>{label}</dt>
        {/* overflow-wrap:anywhere lets a long file name with no spaces wrap instead of spilling out of the card */}
        <dd className={cn("font-medium text-ink [overflow-wrap:anywhere]", !iconOnly && "mt-0.5")}>{children}</dd>
      </div>
    </div>
  );
}
