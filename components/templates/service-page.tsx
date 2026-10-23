import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Included } from "@/components/sections/included";
import { Steps } from "@/components/sections/steps";
import { Outcomes, Chips } from "@/components/sections/outcomes";
import { Faq } from "@/components/sections/faq";
import { LocalAreas } from "@/components/sections/local-areas";
import { SERVICE_STAGES, SystemMap } from "@/components/sections/system-map";
import { CtaBand } from "@/components/sections/cta-band";
import { AnswerSummary } from "@/components/sections/answer-summary";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import Image from "next/image";
import type { ServiceContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/structured-data";

export function ServicePage({
  content,
  section,
}: {
  content: ServiceContent;
  section: { label: string; href: string };
}) {
  const path = `${section.href}/${content.slug}`;

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: section.label, path: section.href },
            { name: content.title, path },
          ]),
          serviceSchema({
            name: content.title,
            description: content.metaDescription,
            path,
            category: section.label,
          }),
          faqSchema(content.faqs),
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: section.label, href: section.href },
          { label: content.title },
        ]}
        eyebrow={content.eyebrow}
        title={content.heroTitle ?? content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={{ label: `All ${section.label}`, href: section.href }}
        aside={content.image ? <HeroPhoto src={content.image.src} alt={content.image.alt} /> : undefined}
      />

      <AnswerSummary
        question={`What is ${content.title}?`}
        answer={content.metaDescription}
        groups={[
          { label: "Problems it addresses", items: content.problem.points.slice(0, 3) },
          { label: "Core deliverables", items: content.included.slice(0, 3) },
          { label: "What success looks like", items: content.outcomes.map((item) => `${item.label}: ${item.body}`) },
        ]}
      />

      <section className="py-section">
        <div className="container-edge grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-h2 text-ink">{content.problem.title}</h2>
            <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-muted">{content.problem.body}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.problem.points.map((point) => (
                <li key={point} className="rounded-lg border border-line bg-card p-5 font-sans text-[15px] text-ink-2">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {content.showcase && <ServiceShowcase {...content.showcase} />}

      <Outcomes items={content.outcomes} />

      {SERVICE_STAGES[content.slug] && (
        <SystemMap
          title={`Where ${content.title.toLowerCase()} fits in your growth system`}
          description="Every service works on one part of the same system: from the first click to the closed sale."
          highlight={SERVICE_STAGES[content.slug].stages}
          note={SERVICE_STAGES[content.slug].note}
        />
      )}

      {content.features && content.features.length > 0 && (
        <FeatureCards
          eyebrow="Capabilities"
          title="What we do"
          items={content.features}
          surface
        />
      )}

      <Included title="What's included" items={content.included} surface={!content.features} />

      {content.costGuide && (
        <section className="border-t border-line py-section">
          <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="eyebrow">Cost</p>
              <h2 className="mt-3 font-display text-h2 text-ink">{content.costGuide.title}</h2>
              <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-muted">{content.costGuide.body}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="grid gap-3 sm:grid-cols-2">
                {content.costGuide.factors.map((factor) => (
                  <div key={factor.label} className="rounded-lg border border-line bg-card p-5">
                    <dt className="font-display text-base font-bold text-ink">{factor.label}</dt>
                    <dd className="mt-2 font-sans text-[15px] leading-relaxed text-muted">{factor.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      )}

      <Steps steps={content.steps} />

      <Chips items={content.tools} />

      <Faq items={content.faqs} />

      <LocalAreas compact title={`${content.title} for businesses across Pune`} />

      <CtaBand />
    </>
  );
}

// The service photo beside the headline, so the first screen is not text only.
function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-lift">
      <Image src={src} alt={alt} width={1536} height={1024} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[3/2] h-auto w-full object-cover" />
    </div>
  );
}
