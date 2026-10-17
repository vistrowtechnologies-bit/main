import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type NotchCard = { title: string; cta: { label: string; href: string } };

// A contained photo at its natural 3:2 shape (no cropping). With `card`, a glowing card is
// notched into the bottom-right corner, which the photos are composed to leave empty.
export function NotchPhoto({ src, alt, card, sizes = "(min-width: 1024px) 640px, 100vw" }: { src: string; alt: string; card?: NotchCard; sizes?: string }) {
  if (!card) {
    return (
      <div className="notch-photo aspect-[3/2] border border-line">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="notch-photo aspect-[3/2]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <div className="notch notch--br sm:w-[46%]">
        <div className="glow-card p-5 sm:p-6">
          <p className="font-display text-lg font-bold leading-snug text-ink">{card.title}</p>
          <Link
            href={card.cta.href}
            className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-strong hover:underline"
          >
            {card.cta.label} <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
