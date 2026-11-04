/**
 * Site-wide content: club name, navigation, footer, contact details.
 * Per-page copy is in home.ts, resources.ts and contact.ts next to this file.
 */
import type { FooterColumn, FooterContact } from "@/stc-ui/site-footer";
import type { NavLink } from "@/stc-ui/site-nav";

export const club = {
  name: "Synapse",
  tagline: "The AI/ML Club",
  homeLabel: "Synapse, the AI/ML Club: home",
} as const;

/** Four pages: Home, Events, Resources, Contact Us (Contact Us is the button at the right of the nav). */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
];
export const contactCta: NavLink = { label: "Contact Us", href: "/contact" };

/** How to reach the club. Source: the TATVA and STC pages on stciitphybrid.in. TODO: add Synapse's own email and socials. */
export const reach = {
  address: "IIT Patna, Bihta, Patna - 801106",
  emails: [
    { label: "TATVA", email: "tatva@iitp.ac.in" },
    { label: "STC", email: "stc_iitp@iitp.ac.in" },
  ],
};

export const footer = {
  blurb: "A TATVA sub-club of the Student Technical Council, IIT Patna Hybrid Programs.",
  columns: [
    {
      title: "Synapse",
      links: [
        { label: "Home", href: "/" },
        { label: "Events", href: "/events" },
        { label: "Resources", href: "/resources" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "STC",
      links: [
        { label: "Student Technical Council", href: "https://www.stciitphybrid.in/" },
        { label: "TATVA wing", href: "https://www.stciitphybrid.in/wings/tatva" },
        { label: "STC events", href: "https://www.stciitphybrid.in/events" },
        { label: "STC on Instagram", href: "https://www.instagram.com/stc_iitp_cet/" },
        {
          label: "STC on LinkedIn",
          href: "https://www.linkedin.com/company/stc-iitp-hybrid-programs/posts/?feedView=all",
        },
      ],
    },
  ] satisfies FooterColumn[],
  contact: {
    title: "Contact",
    lines: [
      { text: reach.address },
      ...reach.emails.map(({ label, email }) => ({ text: email, href: `mailto:${email}`, note: label })),
    ],
  } satisfies FooterContact,
};
