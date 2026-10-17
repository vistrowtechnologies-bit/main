import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export type NotchCard = { title: string; body?: string; cta: { label: string; href: string } };

// A page photo shown at its natural 3:2 shape so nothing is cropped. With `card`, it uses the
// notched frame: a glowing card sits in the bottom-right corner, which the photo is composed to
// leave empty.
export function PageImage({
  src,
  alt,
  position = "top",
  card,
}: {
  src: string;
  alt: string;
  position?: "top" | "bottom";
  card?: NotchCard;
}) {
  return (
    <section className={position === "top" ? "pt-section" : "pb-section"}>
      <div className="container-edge">
        <Reveal className="mx-auto max-w-5xl">
          {card ? (
            <div className="relative">
              <div className="notch-photo aspect-[3/2]">
                <Image src={src} alt={alt} fill sizes="(min-width: 1080px) 1024px, 100vw" className="object-cover" />
              </div>
              <div className="notch notch--br sm:w-[42%] lg:w-[38%]">
                <div className="glow-card p-6 sm:p-7">
                  <p className="font-display text-xl font-bold leading-snug text-ink">{card.title}</p>
                  {card.body && <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted">{card.body}</p>}
                  <Link
                    href={card.cta.href}
                    className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-strong hover:underline"
                  >
                    {card.cta.label} <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <figure className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line">
              <Image src={src} alt={alt} fill sizes="(min-width: 1080px) 1024px, 100vw" className="object-cover" />
            </figure>
          )}
        </Reveal>
      </div>
    </section>
  );
}
