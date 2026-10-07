import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { locations } from "@/content/locations";
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
import { breadcrumbSchema, businessPhone, businessWhatsapp, faqSchema, graph, localBusinessSchema } from "@/lib/structured-data";

export function LocationPage({ content }: { content: LocationContent }) {
  const path = `/locations/${content.slug}`;
  const otherAreas = Object.values(locations).filter((area) => area.slug !== content.slug);

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
            hasOffice: content.hasOffice === true,
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
        secondaryCta={{ label: "WhatsApp us", href: businessWhatsapp, external: true }}
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

      <section className="py-section">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading eyebrow={`${content.area} market`} title={content.localContext.title} />
          <Reveal delay={0.08}>
            <div className="space-y-5 font-sans text-lg leading-relaxed text-muted">
              {content.localContext.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FeatureCards
        eyebrow={`Why ${content.area}`}
        title="Why local businesses choose Vistrow"
        items={content.reasons}
        surface
      />

      <section className="py-section">
        <div className="container-edge">
          <SectionHeading
            eyebrow="Who we help"
            title={`Businesses we work with in ${content.area}`}
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {content.businessTypes.map((type, i) => (
              <Reveal key={type.label} delay={(i % 4) * 0.06}>
                <Link href={type.href} className="glass glass-hover group flex h-full flex-col rounded-lg p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{type.label}</h3>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted">{type.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-strong">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-section">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Local visibility" title={content.visibility.title} description={content.visibility.body} />
          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.visibility.points.map((point) => (
                <li key={point} className="rounded-lg border border-line bg-card p-5 font-sans text-[15px] text-ink-2">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Steps eyebrow="How we work" title={`Getting started in ${content.area}`} steps={content.process} surface />

      <section className="py-section">
        <div className="container-edge grid gap-gutter lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-xl p-8">
              <p className="eyebrow">Talk to us</p>
              <h2 className="mt-3 font-display text-h3 text-ink">Vistrow Technologies, Baner, Pune</h2>
              <p className="mt-3 font-sans leading-relaxed text-muted">
                {content.hasOffice
                  ? `Our office is in Baner, Pune, Maharashtra 411045. Call, message or book a meeting about your ${content.area} business.`
                  : `We serve ${content.area} businesses from our Baner, Pune office, with online calls and in-person meetings when useful.`}
              </p>
              <ul className="mt-6 space-y-3 font-sans text-[15px] text-ink-2">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent-strong" strokeWidth={1.75} /> Baner, Pune, Maharashtra 411045
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent-strong" strokeWidth={1.75} />
                  <a href={`tel:${businessPhone.replace(/\s/g, "")}`} className="hover:text-accent-strong">{businessPhone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <WhatsappIcon className="h-5 w-5 text-accent-strong" />
                  <a href={businessWhatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent-strong">
                    Message us on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass h-full rounded-xl p-8">
              <p className="eyebrow">Areas we serve</p>
              <h2 className="mt-3 font-display text-h3 text-ink">Digital marketing across Pune</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {otherAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/locations/${area.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-card px-4 py-3 font-sans text-[15px] text-ink-2 transition-colors hover:border-accent hover:text-accent-strong"
                    >
                      {area.area === "Pune" ? "Pune (city-wide)" : area.area}
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-sans text-sm text-muted">
                Also serving nearby areas including {content.nearby.filter((n) => !otherAreas.some((a) => a.area === n)).join(", ") || "the wider Pune region"}.{" "}
                <Link href="/locations" className="font-semibold text-accent-strong hover:underline">All locations</Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={content.faqs} />

      <CtaBand
        title={`Get more enquiries from ${content.area}, and answer them first.`}
        subtitle={`A free Growth Audit reviews your marketing, Google profile and lead follow-up for your ${content.area} business, and shows what to fix first.`}
        secondaryCta={{ label: "WhatsApp us", href: businessWhatsapp, external: true }}
      />
    </>
  );
}
