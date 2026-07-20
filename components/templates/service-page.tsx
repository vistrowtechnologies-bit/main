import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Included } from "@/components/sections/included";
import { Steps } from "@/components/sections/steps";
import { Outcomes, Chips } from "@/components/sections/outcomes";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import type { ServiceContent } from "@/lib/content-types";

export function ServicePage({
  content,
  section,
}: {
  content: ServiceContent;
  section: { label: string; href: string };
}) {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: section.label, href: section.href },
          { label: content.title },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={{ label: `All ${section.label}`, href: section.href }}
      />

      {/* Problem */}
      <section className="py-section">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-h2 text-ink">{content.problem.title}</h2>
            <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-muted">
              {content.problem.body}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.problem.points.map((point) => (
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

      <Outcomes items={content.outcomes} />

      {content.features && content.features.length > 0 && (
        <FeatureCards
          eyebrow="Capabilities"
          title="What we do"
          items={content.features}
          surface
        />
      )}

      <Included title="What's included" items={content.included} surface={!content.features} />

      <Steps steps={content.steps} />

      <Chips items={content.tools} />

      <Faq items={content.faqs} />

      <CtaBand />
    </>
  );
}
