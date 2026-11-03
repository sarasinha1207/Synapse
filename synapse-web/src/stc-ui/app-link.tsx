import Link from "next/link";
import type { ComponentProps } from "react";

export type AppLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  /** Open in a new tab. Use for off-site links; adds rel="noopener noreferrer". */
  external?: boolean;
};

/** Routes inside the app ("/resources") must use next/link for instant client-side navigation. */
const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

/** One link component for everything: internal routes use next/link, everything else is a plain anchor. */
export function AppLink({ href, external = false, ...props }: AppLinkProps) {
  if (isInternal(href)) return <Link href={href} {...props} />;
  return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props} />;
}
