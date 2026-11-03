"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Container } from "./container";

export interface NavLink {
  label: string;
  href: string;
  /** Marks the current page for assistive tech and styles it as active. */
  current?: boolean;
}

interface SiteNavProps {
  /** Usually <BrandGroup>. Server-rendered and passed in as a prop. */
  brand: ReactNode;
  links: NavLink[];
  cta: { label: string; href: string };
}

/** Frosted sticky nav. On phones the links collapse into a menu that closes on Escape or after a tap. */
export function SiteNav({ brand, links, cta }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 h-(--nav-h) bg-white/90 shadow-stc-sm backdrop-blur-[10px]">
      <Container className="flex h-full items-center gap-4">
        {brand}

        <nav
          id={menuId}
          aria-label="Primary"
          className={cn(
            "items-center gap-1",
            open
              ? "absolute inset-x-0 top-(--nav-h) flex flex-col items-stretch border-t border-line bg-white px-(--gutter) pt-3 pb-4 shadow-stc-md"
              : "hidden",
            "md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none",
          )}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={link.current ? "page" : undefined}
              className="block rounded-stc px-3.5 py-2 text-sm font-medium text-ink-2 hover:bg-soft aria-[current=page]:bg-brand-tint aria-[current=page]:text-brand"
            >
              {link.label}
            </a>
          ))}
          <span className="mt-2 md:hidden">
            <Button href={cta.href} onClick={close} className="w-full">
              {cta.label}
            </Button>
          </span>
        </nav>

        <Button href={cta.href} size="sm" className="hidden md:inline-flex">
          {cta.label}
        </Button>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="inline-grid size-10 cursor-pointer place-items-center rounded-stc border border-line bg-white text-ink md:hidden"
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </Container>
    </header>
  );
}
