import { PageHero } from "@/components/sections/page-hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Included } from "@/components/sections/included";
import { Steps } from "@/components/sections/steps";
import { Outcomes, Chips } from "@/components/sections/outcomes";
import { Faq } from "@/components/sections/faq";
import { LocalAreas } from "@/components/sections/local-areas";
import { NotchPhoto } from "@/components/sections/notch-photo";
import { SERVICE_STAGES, SystemMap } from "@/components/sections/system-map";
import { CtaBand } from "@/components/sections/cta-band";
import { AnswerSummary } from "@/components/sections/answer-summary";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import type { ServiceContent } from "@/lib/content-types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/structured-data";

const engagementClarity = [
  { title: "Starting point", body: "An audit of the current journey, data, ownership, and constraints before a channel or tool is prescribed." },
  { title: "Written scope", body: "Deliverables, access, dependencies, owners, measurement, and commercials documented before work begins." },
  { title: "Decision evidence", body: "A review rhythm tied to agreed business signals, with assumptions and platform limitations kept visible." },
];

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
      />

      <AnswerSummary
        question={`What is ${content.title}?`}
        answer={content.subtitle}
        groups={[
          { label: "Problems it addresses", items: content.problem.points.slice(0, 3) },
          { label: "Core deliverables", items: content.included.slice(0, 3) },
          { label: "What success looks like", items: content.outcomes.map((item) => `${item.label}: ${item.body}`) },
        ]}
      />

      {/* Problem: heading across the top, then the page photo beside the copy */}
      <section className="py-section">
        <div className="container-edge">
          <h2 className="max-w-3xl font-display text-h2 text-ink">{content.problem.title}</h2>
          <div className={`mt-10 grid items-center gap-10 xl:gap-14 ${content.image ? "xl:grid-cols-2" : ""}`}>
            {content.image && (
              <Reveal className="max-w-2xl xl:max-w-none">
                <NotchPhoto
                  src={content.image.src}
                  alt={content.image.alt}
                  card={{ title: "Not sure where your leads are slipping away?", cta: { label: "Request a free Growth Audit", href: "/growth-audit" } }}
                />
              </Reveal>
            )}
            <Reveal delay={0.08}>
              <p className="max-w-xl font-sans text-lg leading-relaxed text-muted">{content.problem.body}</p>
              <ul className={`mt-8 grid gap-3 sm:grid-cols-2 ${content.image ? "xl:grid-cols-1" : "lg:grid-cols-4"}`}>
                {content.problem.points.map((point) => (
                  <li key={point} className="rounded-lg border border-line bg-card p-4 font-sans text-[15px] text-ink-2">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

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

      <section className="border-y border-line bg-surface py-section">
        <div className="container-edge">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Engagement clarity</p>
            <h2 className="mt-3 font-display text-h2 text-ink">What is agreed before {content.title.toLowerCase()} begins</h2>
          </div>
          <div className="mt-10 grid gap-gutter md:grid-cols-3">
            {engagementClarity.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-lg border border-line bg-card p-6">
                  <span className="font-display text-sm font-bold text-accent-strong">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Steps steps={content.steps} />

      <Chips items={content.tools} />

      <Faq items={content.faqs} />

      <LocalAreas compact title={`${content.title} for businesses across Pune`} />

      <CtaBand />
    </>
  );
}
