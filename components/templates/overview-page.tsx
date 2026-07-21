import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Steps } from "@/components/sections/steps";
import { Faq } from "@/components/sections/faq";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import type { OverviewContent } from "@/lib/content-types";
import { breadcrumbSchema, collectionSchema, faqSchema, graph } from "@/lib/structured-data";

export function OverviewPage({
  content,
  parent,
}: {
  content: OverviewContent;
  parent?: { label: string; href: string };
}) {
  const path = parent?.href ?? "/";
  const breadcrumb = parent
    ? [{ label: "Home", href: "/" }, { label: parent.label }]
    : [{ label: "Home", href: "/" }];

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema(
            parent
              ? [
                  { name: "Home", path: "/" },
                  { name: parent.label, path },
                ]
              : [{ name: "Home", path: "/" }],
          ),
          collectionSchema({
            name: content.metaTitle,
            description: content.metaDescription,
            path,
            items: content.cards.map((card) => ({ name: card.label, path: card.href })),
          }),
          ...(content.faqs ? [faqSchema(content.faqs)] : []),
        ])}
      />
      <PageHero
        breadcrumb={breadcrumb}
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
      />

      {content.intro && (
        <section className="py-section">
          <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={content.intro.eyebrow ?? "The connected system"}
              title={content.intro.title}
              description={content.intro.body}
            />
            <Reveal delay={0.08}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.intro.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-lg border border-line bg-card p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={2} />
                    <span className="font-sans text-[15px] leading-relaxed text-ink-2">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-surface py-section">
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

      {content.process && (
        <Steps
          eyebrow="How it comes together"
          title="A clear route from first step to measurable outcome"
          steps={content.process}
        />
      )}

      {content.faqs && <Faq items={content.faqs} />}

      <CtaBand />
    </>
  );
}
