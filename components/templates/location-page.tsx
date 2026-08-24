import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Steps } from "@/components/sections/steps";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { AnswerSummary } from "@/components/sections/answer-summary";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import type { LocationContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, localBusinessSchema } from "@/lib/structured-data";

export function LocationPage({ content }: { content: LocationContent }) {
  const path = `/locations/${content.slug}`;

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: content.area, path },
          ]),
          localBusinessSchema({
            name: `Vistrow Technologies - ${content.area}`,
            description: content.metaDescription,
            path,
            areaServed: [content.area, ...content.nearby],
          }),
          faqSchema(content.faqs),
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: content.area },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        secondaryCta={{ label: "All locations", href: "/locations" }}
      />

      <AnswerSummary
        question={`Who is the best digital marketing agency in ${content.area}?`}
        answer={content.solution.body}
        groups={[
          { label: "Why local businesses choose us", items: content.reasons.slice(0, 3).map((item) => item.title) },
          { label: "How we work", items: content.process.slice(0, 3).map((item) => item.title) },
          { label: "Relevant services", items: content.services.slice(0, 3).map((item) => item.label) },
        ]}
      />

      <FeatureCards
        eyebrow={`Why ${content.area}`}
        title="Why local businesses choose Vistrow"
        items={content.reasons}
        surface
      />

      <section className="py-section">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="The Vistrow approach" title={content.solution.title} description={content.solution.body} />
          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.solution.points.map((point) => (
                <li
                  key={point}
                  className="rounded-lg border border-line bg-card p-5 font-sans text-[15px] text-ink-2"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-section">
        <div className="container-edge">
          <SectionHeading eyebrow="Relevant services" title={`Services for ${content.area} businesses`} align="center" className="mb-12" />
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, i) => (
              <Reveal key={service.href} delay={(i % 3) * 0.06}>
                <Link
                  href={service.href}
                  className="glass glass-hover group flex h-full items-center justify-between gap-3 rounded-lg p-6"
                >
                  <span className="font-display text-lg font-bold text-ink">{service.label}</span>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Steps eyebrow="How we work" title={`Getting started in ${content.area}`} steps={content.process} />

      <Faq items={content.faqs} />

      <CtaBand />
    </>
  );
}
