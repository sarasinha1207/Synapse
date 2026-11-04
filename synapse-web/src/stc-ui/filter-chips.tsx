"use client";

import { cn } from "@/lib/utils";

interface FilterOption<T extends string> {
  value: T;
  label: string;
  /** How many items this filter would show. */
  count?: number;
}

interface FilterChipsProps<T extends string> {
  /** Accessible name of the group, e.g. "Filter by category". */
  label: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** A row of pill buttons where exactly one is selected. Selected = brand fill; each is a toggle button with aria-pressed. */
export function FilterChips<T extends string>({ label, options, value, onChange }: FilterChipsProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              selected ? "border-brand bg-brand text-on-brand" : "border-field bg-white text-ink hover:bg-brand-tint",
            )}
          >
            {option.label}
            {option.count !== undefined ? (
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs font-semibold",
                  selected ? "bg-white/20 text-on-brand" : "bg-soft text-muted",
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
