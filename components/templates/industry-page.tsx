import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Steps } from "@/components/sections/steps";
import { NotchPhoto } from "@/components/sections/notch-photo";
import { SystemMap, stagesForServices } from "@/components/sections/system-map";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { AnswerSummary } from "@/components/sections/answer-summary";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import type { IndustryContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/structured-data";

export function IndustryPage({ content, extra }: { content: IndustryContent; extra?: ReactNode }) {
  const path = content.path ?? `/industries/${content.slug}`;
  const market = Boolean(content.path);

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema(
            market
              ? [
                  { name: "Home", path: "/" },
                  { name: content.title, path },
                ]
              : [
                  { name: "Home", path: "/" },
                  { name: "Industries", path: "/industries" },
                  { name: content.title, path },
                ],
          ),
          serviceSchema({
            name: content.schemaName ?? `${content.title} growth systems`,
            description: content.metaDescription,
            path,
            category: `${content.title} digital marketing and automation`,
          }),
          faqSchema(content.faqs),
        ])}
      />
      <PageHero
        breadcrumb={
          market
            ? [{ label: "Home", href: "/" }, { label: content.title }]
            : [
                { label: "Home", href: "/" },
                { label: "Industries", href: "/industries" },
                { label: content.title },
              ]
        }
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={market ? { label: "Talk to Vistrow", href: "/contact" } : { label: "All industries", href: "/industries" }}
      />

      <AnswerSummary
        question={content.audience ? `How does Vistrow help ${content.audience} grow?` : `How does Vistrow help teams in ${content.title.toLowerCase()} grow?`}
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

      {/* Solution: heading across the top, then the page photo beside the copy when there is one */}
      <section className="py-section">
        {content.image ? (
          <div className="container-edge">
            <SectionHeading eyebrow="The Vistrow solution" title={content.solution.title} className="mb-10 max-w-3xl" />
            <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-14">
              <Reveal className="max-w-2xl xl:max-w-none">
                <NotchPhoto src={content.image.src} alt={content.image.alt} />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="max-w-xl font-sans text-lg leading-relaxed text-muted">{content.solution.body}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {content.solution.points.map((point) => (
                    <li key={point} className="rounded-lg border border-line bg-card p-4 font-sans text-[15px] text-ink-2">
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        ) : (
          <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading eyebrow="The Vistrow solution" title={content.solution.title} description={content.solution.body} />
            <Reveal delay={0.08}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.solution.points.map((point) => (
                  <li key={point} className="rounded-lg border border-line bg-card p-5 font-sans text-[15px] text-ink-2">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        )}
      </section>

      <SystemMap
        title={`Where Vistrow usually starts for ${content.audience ?? content.title.toLowerCase()}`}
        description="The highlighted stages are where teams in this industry most often lose enquiries, and where we start."
        highlight={stagesForServices(content.services.map((service) => service.href))}
      />

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

      {extra}

      <Faq items={content.faqs} />

      <CtaBand />
    </>
  );
}
