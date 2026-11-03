import { BrandGroup } from "@/stc-ui/brand";
import { SiteFooter } from "@/stc-ui/site-footer";
import { SiteNav } from "@/stc-ui/site-nav";
import { club, contactCta, footer, navLinks } from "./content/site";
import { SynapseLockup } from "./lockup";

/** Shown on every page (rendered once, in app/layout.tsx). */
export function SynapseNav() {
  return (
    <SiteNav
      brand={
        <BrandGroup>
          <SynapseLockup href="/" label={club.homeLabel} />
        </BrandGroup>
      }
      links={navLinks}
      cta={contactCta}
    />
  );
}

export function SynapseFooter() {
  return (
    <SiteFooter
      brand={
        <BrandGroup onDark>
          <SynapseLockup href="/" label={club.homeLabel} onDark />
        </BrandGroup>
      }
      blurb={footer.blurb}
      columns={footer.columns}
      contact={footer.contact}
      legal={`© ${new Date().getFullYear()} Synapse · Student Technical Council For Hybrid programs, IIT Patna. All rights reserved.`}
    />
  );
}
