import { CircleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared look for text fields, selects and text areas.
 * The border uses --color-field (4.84:1 on white), not --color-line (1.24:1): WCAG requires 3:1 for the
 * boundary of a form control. Errors switch the border to --color-danger via aria-invalid.
 */
export const controlClass =
  "w-full rounded-stc border border-field bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-muted " +
  "focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand " +
  "aria-[invalid=true]:border-danger disabled:cursor-not-allowed disabled:bg-soft";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlClass, "min-h-36 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(controlClass, className)} {...props} />;
}

/** Builds the aria-describedby value for a control from its optional hint and error. */
export function describedBy(id: string, parts: { hint?: string; error?: string }) {
  return [parts.hint ? `${id}-hint` : null, parts.error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

interface FieldProps {
  /** Must equal the id of the control inside. */
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

/** Label + optional hint + control + optional error message, wired for screen readers (use describedBy on the control). */
export function Field({ id, label, hint, error, required, children }: FieldProps) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <>
            <span aria-hidden className="text-danger">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm text-danger">
          <CircleAlert aria-hidden className="mt-0.5 size-4 flex-none" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
