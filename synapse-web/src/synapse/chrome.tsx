import { BrandGroup } from "@/stc-ui/brand";
import { SiteFooter } from "@/stc-ui/site-footer";
import { SiteNav } from "@/stc-ui/site-nav";
import { club, footer, joinCta, navLinks } from "./content";
import { SynapseLockup } from "./lockup";

export function SynapseNav() {
  return (
    <SiteNav
      brand={
        <BrandGroup>
          <SynapseLockup href="#top" label={club.homeLabel} />
        </BrandGroup>
      }
      links={navLinks}
      cta={joinCta}
    />
  );
}

export function SynapseFooter() {
  return (
    <SiteFooter
      brand={
        <BrandGroup onDark>
          <SynapseLockup href="#top" label={club.topLabel} onDark />
        </BrandGroup>
      }
      blurb={footer.blurb}
      columns={footer.columns}
      contact={footer.contact}
      legal={`© ${new Date().getFullYear()} Synapse · Student Technical Council For Hybrid programs, IIT Patna. All rights reserved.`}
    />
  );
}
