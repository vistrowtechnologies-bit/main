import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, collectionSchema, graph } from "@/lib/structured-data";
import type { PortfolioSite } from "@/content/portfolio";

export function PortfolioGallery({ sites }: { sites: PortfolioSite[] }) {
  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Website Portfolio", path: "/work/website-portfolio" },
          ]),
          collectionSchema({
            name: "Website Portfolio",
            description: "Websites and products designed and built by Vistrow.",
            path: "/work/website-portfolio",
            items: sites.map((site) => ({ name: site.name, path: "/work/website-portfolio" })),
          }),
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Website Portfolio" },
        ]}
        eyebrow="Work"
        title="Websites we've"
        highlight="designed and built"
        subtitle="A selection of live product and client websites, from first-party builds to project microsites, across real estate, marketing, and manufacturing."
        secondaryCta={{ label: "All work", href: "/work" }}
      />

      <section className="py-section">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {sites.map((site, i) => (
              <Reveal key={site.slug} delay={(i % 2) * 0.08}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <Image
                      src={site.image}
                      alt={`${site.name} website preview`}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <span className="w-fit rounded-full bg-accent-tint px-3 py-1 font-sans text-xs font-semibold text-accent-ink">
                      {site.tag}
                    </span>
                    <h3 className="mt-5 flex items-center gap-2 font-display text-h3 text-ink">
                      {site.name}
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-accent-strong opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={2} />
                    </h3>
                    <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-muted">
                      {site.summary}
                    </p>
                    <span className="mt-5 border-t border-line pt-5 font-sans text-sm font-semibold text-accent-strong">
                      {site.url.replace("https://www.", "").replace("https://", "")}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center font-sans text-xs text-muted">
            Owned products are identified as first-party work. Client sites are shown with permission.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
