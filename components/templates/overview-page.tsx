import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { OverviewContent } from "@/lib/content-types";

export function OverviewPage({
  content,
  parent,
}: {
  content: OverviewContent;
  parent?: { label: string; href: string };
}) {
  const breadcrumb = parent
    ? [{ label: "Home", href: "/" }, { label: parent.label }]
    : [{ label: "Home", href: "/" }];

  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
      />

      <section className="py-section">
        <div className="container-edge">
          {content.cardsTitle && (
            <SectionHeading eyebrow="Explore" title={content.cardsTitle} className="mb-12" />
          )}
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {content.cards.map((card, i) => (
              <Reveal key={card.href} delay={(i % 3) * 0.06}>
                <Link
                  href={card.href}
                  className="glass glass-hover group flex h-full flex-col rounded-lg p-7"
                >
                  <div className="flex items-start justify-between">
                    {card.icon && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-accent-tint">
                        <card.icon className="h-6 w-6 text-accent-strong" strokeWidth={1.75} />
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

      <CtaBand />
    </>
  );
}
