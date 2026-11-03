import type { ReactNode } from "react";

interface CtaBandProps {
  title: string;
  description: string;
  /** Buttons. Use Button variants "light" and "outlineLight" so they read on the brand background. */
  children: ReactNode;
}

/** White text on --brand -> --brand-deep. Stays >= 4.5:1 as long as --brand lightness <= ~0.56. */
export function CtaBand({ title, description, children }: CtaBandProps) {
  return (
    <div className="grid justify-items-center gap-5 rounded-stc-lg bg-linear-to-br from-brand to-brand-deep px-(--gutter) py-[clamp(2.5rem,6vw,4rem)] text-center text-white">
      <h2 className="text-h2 font-bold text-balance">{title}</h2>
      <p className="max-w-xl text-white/92">{description}</p>
      <div className="flex flex-wrap justify-center gap-3">{children}</div>
    </div>
  );
}
