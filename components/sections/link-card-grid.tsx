import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { OverviewCard } from "@/lib/content-types";

export function LinkCardGrid({
  eyebrow,
  title,
  cards,
  columns = 3,
  surface = false,
}: {
  eyebrow?: string;
  title?: string;
  cards: OverviewCard[];
  columns?: 2 | 3;
  surface?: boolean;
}) {
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section className={`py-section ${surface ? "bg-surface" : ""}`}>
      <div className="container-edge">
        {title && <SectionHeading eyebrow={eyebrow ?? "Explore"} title={title} className="mb-12" />}
        <div className={`grid grid-cols-1 gap-gutter ${cols}`}>
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={(i % 3) * 0.06}>
              <Link
                href={card.href}
                className="glass glass-hover group flex h-full flex-col rounded-lg p-7"
              >
                <div className="flex items-start justify-between">
                  {card.icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-accent-tint">
                      <card.icon className="h-6 w-6 text-accent-ink" strokeWidth={1.75} />
                    </div>
                  )}
                  <ArrowUpRight
                    className="h-5 w-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{card.label}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{card.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
