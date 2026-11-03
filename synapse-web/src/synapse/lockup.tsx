import Image from "next/image";
import { ClubLockup } from "@/stc-ui/brand";
import emblem from "./assets/synapse-emblem.png";
import { club } from "./content/site";
import { Wordmark } from "./wordmark";

interface SynapseLockupProps {
  href: string;
  label: string;
  onDark?: boolean;
}

/** Synapse emblem + gradient wordmark + "The AI/ML Club". */
export function SynapseLockup({ href, label, onDark = false }: SynapseLockupProps) {
  return (
    <ClubLockup
      href={href}
      label={label}
      onDark={onDark}
      tagline={club.tagline}
      mark={<Image src={emblem} alt="" className="h-10 w-auto flex-none rounded-sm" />}
      name={<Wordmark />}
    />
  );
}
