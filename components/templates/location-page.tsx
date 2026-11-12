import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { locations } from "@/content/locations";
import { PageHero } from "@/components/sections/page-hero";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { CardLinkGrid, ChallengeGrid, FactStrip, ServiceLinkGrid, SolutionSplit, TextSplit, Timeline } from "@/components/sections/service-blocks";
import { Reveal } from "@/components/ui/reveal";
import { Card, Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import type { LocationContent } from "@/lib/content-types";
import { breadcrumbSchema, businessPhone, businessWhatsapp, faqSchema, graph, localBusinessSchema } from "@/lib/structured-data";

export function LocationPage({ content }: { content: LocationContent }) {
  const path = `/locations/${content.slug}`;
  const otherAreas = Object.values(locations).filter((area) => area.slug !== content.slug);
  // Service links fill whole rows: add an "All services" card when the count divides by neither 3 nor 4.
  const serviceLinks =
    content.services.length % 3 === 0 || content.services.length % 4 === 0
      ? content.services
      : [...content.services, { label: "All services", href: "/services" }];
  const serviceCols = serviceLinks.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";

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
        aside={
          content.image ? (
            <div className="relative overflow-hidden rounded-lg border border-line bg-card shadow-lift">
              <Image src={content.image.src} alt={content.image.alt} width={1536} height={1024} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[3/2] h-auto w-full object-cover" />
            </div>
          ) : undefined
        }
      />

      <FactStrip
        answer={content.metaDescription}
        facts={[
          { label: "Area", value: content.area },
          { label: "Based in", value: "Baner, Pune" },
          { label: "Also serves", value: content.nearby.slice(0, 3).join(", ") || "The wider Pune region" },
        ]}
      />

      <TextSplit eyebrow={`${content.area} market`} title={content.localContext.title} paragraphs={content.localContext.paragraphs} />

      <ChallengeGrid eyebrow={`Why ${content.area}`} title="Why local businesses choose Vistrow" items={content.reasons} tone="surface" />

      <CardLinkGrid
        eyebrow="Who we help"
        title={`Businesses we work with in ${content.area}`}
        cards={content.businessTypes}
        cta="Learn more"
      />

      <SolutionSplit eyebrow="The Vistrow approach" title={content.solution.title} body={content.solution.body} points={content.solution.points} />

      <ServiceLinkGrid title={`Services for ${content.area} businesses`} services={serviceLinks} tone="plain" />

      <SolutionSplit eyebrow="Local visibility" title={content.visibility.title} body={content.visibility.body} points={content.visibility.points} />

      <Timeline tone="plain" eyebrow="How we work" title={`Getting started in ${content.area}`} steps={content.process} />

      <Section tone="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card>
              <p className="eyebrow">Talk to us</p>
              <h2 className="mt-3 font-display text-h3 text-ink">Vistrow Technologies, Baner, Pune</h2>
              <p className="mt-3 font-sans leading-relaxed text-muted">
                {content.hasOffice
                  ? `Our office is at Office No. 702, Icon Tower, Baner Road, Baner, Pune, Maharashtra 411045. Call, message or book a meeting about your ${content.area} business.`
                  : `We serve ${content.area} businesses from our Baner, Pune office, with online calls and in-person meetings when useful.`}
              </p>
              <ul className="mt-6 space-y-3 font-sans text-[15px] text-ink-2">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent-strong" strokeWidth={1.75} /> Office No. 702, Icon Tower, Baner Road, Baner, Pune, Maharashtra 411045
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
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
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
                <li>
                  <Link
                    href="/locations"
                    className="group flex items-center justify-between gap-3 rounded-lg border border-accent/40 bg-card px-4 py-3 font-sans text-[15px] font-semibold text-accent-strong transition-colors hover:border-accent"
                  >
                    All locations
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                  </Link>
                </li>
              </ul>
              <p className="mt-5 font-sans text-sm text-muted">
                Also serving nearby areas including {content.nearby.filter((n) => !otherAreas.some((a) => a.area === n)).join(", ") || "the wider Pune region"}.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <div className="[&>section]:py-block">
        <Faq items={content.faqs} />
      </div>

      <CtaBand
        title={`Get more enquiries from ${content.area}, and answer them first.`}
        subtitle={`A free Growth Audit reviews your marketing, Google profile and lead follow-up for your ${content.area} business, and shows what to fix first.`}
        secondaryCta={{ label: "WhatsApp us", href: businessWhatsapp, external: true }}
      />
    </>
  );
}
