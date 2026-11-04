"use client";

import { FolderOpen } from "lucide-react";
import { useState } from "react";
import { Card } from "@/stc-ui/card";
import { FilterChips } from "@/stc-ui/filter-chips";
import { ResourceCard } from "@/stc-ui/resource-card";
import { formatPlainDate } from "@/lib/format";
import { resourceCategories, type ResourceCategoryId, type ResourceItem } from "../content/resources";

type Filter = "all" | ResourceCategoryId;

/** The category filter plus the grid of document cards. Filtering happens in the browser, instantly. */
export function ResourceBrowser({ items }: { items: ResourceItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All", count: items.length },
    ...resourceCategories.map((category) => ({
      value: category.id as Filter,
      label: category.label,
      count: items.filter((item) => item.category === category.id).length,
    })),
  ];

  const shown = filter === "all" ? items : items.filter((item) => item.category === filter);
  const label = resourceCategories.find((category) => category.id === filter)?.label;

  return (
    <div className="grid gap-8">
      <FilterChips label="Filter by category" options={options} value={filter} onChange={setFilter} />

      {/* Announced to screen readers whenever the filter changes. */}
      <p role="status" className="text-sm text-muted">
        Showing {shown.length} of {items.length} {items.length === 1 ? "resource" : "resources"}
        {label ? ` in ${label}` : ""}
      </p>

      {shown.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-6">
          {shown.map((item) => (
            <li key={item.downloadHref}>
              <ResourceCard
                title={item.title}
                fileName={item.fileName}
                categoryLabel={resourceCategories.find((category) => category.id === item.category)?.label ?? item.category}
                dateLabel={formatPlainDate(item.date)}
                viewHref={item.viewHref}
                downloadHref={item.downloadHref}
                leaderboardHref={item.leaderboardHref}
                sample={item.sample}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Card interactive={false} className="flex items-center gap-3 text-muted">
          <FolderOpen aria-hidden className="size-5 flex-none text-brand" />
          Nothing in {label ?? "this category"} yet. Check back soon, or pick another category.
        </Card>
      )}
    </div>
  );
}
