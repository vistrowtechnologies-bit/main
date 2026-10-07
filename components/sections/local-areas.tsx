import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { locations } from "@/content/locations";

export function LocalAreas({
  title = "Digital marketing agency in Pune",
  intro = "Vistrow works from Baner, Pune, and serves businesses across the city. Pick your area to see how we help local businesses get found, get enquiries and follow up fast.",
  compact = false,
}: {
  title?: string;
  intro?: string;
  compact?: boolean;
}) {
  const areas = Object.values(locations);

  if (compact) {
    return (
      <section className="border-t border-line py-12">
        <div className="container-edge">
          <p className="font-sans text-[15px] leading-relaxed text-muted">
            <span className="font-semibold text-ink">{title}: </span>
            {areas.map((area, i) => (
              <span key={area.slug}>
                <Link href={`/locations/${area.slug}`} className="text-accent-strong underline-offset-2 hover:underline">
                  {area.area}
                </Link>
                {i < areas.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section">
      <div className="container-edge">
        <SectionHeading eyebrow="Based in Baner, Pune" title={title} description={intro} align="center" className="mb-12" />
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <Reveal key={area.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/locations/${area.slug}`}
                className="glass glass-hover group flex h-full flex-col rounded-lg p-6"
              >
                <span className="font-display text-lg font-bold text-ink">{area.title}</span>
                <span className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted">
                  {area.localContext.title}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-strong">
                  See how we help
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
