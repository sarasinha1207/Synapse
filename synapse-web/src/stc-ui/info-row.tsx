import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

/**
 * One labelled fact with an icon, used inside cards (Speaker, Date, Platform, Document...).
 * Must sit inside a <dl>. The icon sits in a small brand-tinted tile; the label is in label style.
 */
export function InfoRow({ icon: Icon, label, children }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 text-[0.9375rem]">
      <span className="mt-0.5 grid size-8 flex-none place-items-center rounded-stc bg-brand-tint text-brand">
        <Icon aria-hidden className="size-4" />
      </span>
      <div className="min-w-0">
        <dt className="stc-label text-label font-medium text-muted">{label}</dt>
        <dd className="mt-0.5 font-medium break-words text-ink">{children}</dd>
      </div>
    </div>
  );
}
