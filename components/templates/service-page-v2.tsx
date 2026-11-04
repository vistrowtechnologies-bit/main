import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Faq } from "@/components/sections/faq";
import { LocalAreas } from "@/components/sections/local-areas";
import { SERVICE_STAGES, SystemMap } from "@/components/sections/system-map";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Card, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { HeroScreen, ServiceShowcase } from "@/components/sections/service-showcase";
import { Deliverables, FactStrip, ProblemOutcome, Timeline } from "@/components/sections/service-blocks";
import type { ServiceContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/structured-data";

/**
 * The redesigned service page: one fixed order of blocks, one spacing rhythm, one card style.
 * Hero, short answer and facts, problem against outcome, process, deliverables, growth system, FAQ.
 */
export function ServicePage({
  content,
  section,
}: {
  content: ServiceContent;
  section: { label: string; href: string };
}) {
  const path = `${section.href}/${content.slug}`;
  const heroShot = content.heroShot ?? content.showcase?.shots[0];
  const showcaseRest = (content.showcase?.shots ?? []).filter((shot) => shot.src !== heroShot?.src);
  const deliverablesPhoto = content.photos?.outcome ?? (heroShot ? content.image : undefined);

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: section.label, path: section.href },
            { name: content.title, path },
          ]),
          serviceSchema({ name: content.title, description: content.metaDescription, path, category: section.label }),
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
        aside={
          heroShot ? (
            <HeroScreen shot={heroShot} />
          ) : content.image ? (
            <div className="relative overflow-hidden rounded-lg border border-line bg-card shadow-lift">
              <Image src={content.image.src} alt={content.image.alt} width={1536} height={1024} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[3/2] h-auto w-full object-cover" />
            </div>
          ) : undefined
        }
      />

      <FactStrip answer={content.metaDescription} facts={content.facts ?? []} />
      <ProblemOutcome problem={content.problem} outcomes={content.outcomes} />
      {content.showcase && showcaseRest.length > 0 && <ServiceShowcase {...content.showcase} shots={showcaseRest} />}

      {content.features && content.features.length > 0 && (
        <div className="[&>section]:py-block">
          <FeatureCards eyebrow="Capabilities" title="What we do" items={content.features} />
        </div>
      )}

      <Timeline steps={content.steps} />
      <Deliverables items={content.included} tools={content.tools} image={deliverablesPhoto ?? content.image} />

      {content.costGuide && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading eyebrow="Cost" title={content.costGuide.title} description={content.costGuide.body} />
            <Reveal delay={0.08}>
              <dl className="grid gap-4 sm:grid-cols-2">
                {content.costGuide.factors.map((factor) => (
                  <Card key={factor.label} className="p-5 sm:p-6">
                    <dt className="font-display text-lg font-bold text-ink">{factor.label}</dt>
                    <dd className="mt-2 font-sans text-base leading-relaxed text-muted">{factor.body}</dd>
                  </Card>
                ))}
              </dl>
            </Reveal>
          </div>
        </Section>
      )}

      {SERVICE_STAGES[content.slug] && (
        <div className="[&>section]:py-block">
          <SystemMap
            title={`Where ${content.title.toLowerCase()} fits in your growth system`}
            description="Every service works on one part of the same system: from the first click to the closed sale."
            highlight={SERVICE_STAGES[content.slug].stages}
            note={SERVICE_STAGES[content.slug].note}
            surface
          />
        </div>
      )}

      <div className="[&>section]:py-block">
        <Faq items={content.faqs} />
        <LocalAreas compact title={`${content.title} for businesses across Pune`} />
      </div>

      <CtaBand />
    </>
  );
}
