import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** Two-column checklist, e.g. "What's included". */
export function Included({
  eyebrow = "What's included",
  title,
  description,
  items,
  surface = true,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
  surface?: boolean;
  /** Photo beside the checklist; the heading moves above the list. */
  image?: { src: string; alt: string };
}) {
  if (image) {
    return (
      <section className={`py-section ${surface ? "bg-surface" : ""}`}>
        <div className="container-edge grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-lift">
              <Image src={image.src} alt={image.alt} width={1536} height={1024} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[4/3] h-auto w-full object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            <Reveal delay={0.08}>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-line pb-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={2} />
                    <span className="font-sans text-[15px] text-ink-2">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-section ${surface ? "bg-surface" : ""}`}>
      <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Reveal>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-line pb-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={2} />
                <span className="font-sans text-[15px] text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
