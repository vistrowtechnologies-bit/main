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
import type { IndustryContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/structured-data";

export function IndustryPage({ content }: { content: IndustryContent }) {
  const path = `/industries/${content.slug}`;

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: content.title, path },
          ]),
          serviceSchema({
            name: `${content.title} growth systems`,
            description: content.metaDescription,
            path,
            category: `${content.title} digital marketing and automation`,
          }),
          faqSchema(content.faqs),
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: content.title },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={{ label: "All industries", href: "/industries" }}
      />

      <AnswerSummary
        question={`How does Vistrow help teams in ${content.title.toLowerCase()} grow?`}
        answer={content.solution.body}
        groups={[
          { label: "Common growth gaps", items: content.challenges.slice(0, 3).map((item) => item.title) },
          { label: "Connected workflow", items: content.workflow.slice(0, 3).map((item) => item.title) },
          { label: "Relevant capabilities", items: content.services.slice(0, 3).map((item) => item.label) },
        ]}
      />

      <FeatureCards
        eyebrow="Common challenges"
        title="What slows growth here"
        items={content.challenges}
        surface
      />

      {/* Solution */}
      <section className="py-section">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="The Vistrow solution" title={content.solution.title} description={content.solution.body} />
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

      {/* Relevant services */}
      <section className="border-t border-line bg-surface py-section">
        <div className="container-edge">
          <SectionHeading eyebrow="Relevant services" title="Where we usually start" align="center" className="mb-12" />
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

      <Steps eyebrow="Example workflow" title="How a lead moves through the system" steps={content.workflow} />

      <Faq items={content.faqs} />

      <CtaBand />
    </>
  );
}
