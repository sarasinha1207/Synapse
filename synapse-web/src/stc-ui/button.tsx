import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-stc border border-transparent text-sm leading-tight font-medium no-underline transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-brand text-on-brand hover:bg-brand-hover",
        secondary: "border-line bg-white text-ink hover:border-brand-line hover:bg-brand-tint",
        /** White button for use on a --brand background (CTA band). */
        light: "bg-white text-brand-deep hover:bg-brand-tint",
        /** Outlined button for use on a --brand background (CTA band). */
        outlineLight: "border-white/55 text-white hover:bg-white/12",
      },
      size: {
        default: "px-5 py-3",
        sm: "px-4 py-2",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ComponentProps<"a"> & VariantProps<typeof buttonVariants>;

/** A link that looks like a button. All STC CTAs are links (to a section, a form, or another page). */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
