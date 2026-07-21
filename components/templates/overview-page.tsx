import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkCardGrid } from "@/components/sections/link-card-grid";
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

      <LinkCardGrid title={content.cardsTitle} cards={content.cards} surface />

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
