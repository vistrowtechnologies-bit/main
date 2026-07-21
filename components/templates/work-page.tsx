import { TrendingUp } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { AnswerSummary } from "@/components/sections/answer-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, collectionSchema, graph } from "@/lib/structured-data";

export type WorkItem = {
  title: string;
  tag: string;
  summary: string;
  metric: string;
  metricLabel: string;
};

export type WorkContent = {
  slug: string;
  title: string;
  highlight?: string;
  eyebrow: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  items: WorkItem[];
};

export function WorkPage({ content }: { content: WorkContent }) {
  const path = `/work/${content.slug}`;

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: content.title, path },
          ]),
          collectionSchema({
            name: content.title,
            description: content.metaDescription,
            path,
            items: content.items.map((item) => ({ name: item.title, path })),
          }),
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: content.title },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        secondaryCta={{ label: "All work", href: "/work" }}
      />

      <AnswerSummary
        question={`What does Vistrow's ${content.title.toLowerCase()} show?`}
        answer={content.subtitle}
        groups={[
          { label: "Problems addressed", items: content.items.slice(0, 3).map((item) => item.title) },
          { label: "Systems involved", items: content.items.slice(0, 3).map((item) => item.tag) },
          { label: "Outcomes measured", items: content.items.slice(0, 3).map((item) => item.metricLabel) },
        ]}
      />

      <section className="py-section">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {content.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08}>
                <article className="glass glass-hover flex h-full flex-col rounded-lg p-8">
                  <span className="w-fit rounded-full bg-accent-tint px-3 py-1 font-sans text-xs font-semibold text-accent-ink">
                    {item.tag}
                  </span>
                  <h3 className="mt-5 font-display text-h3 text-ink">{item.title}</h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-muted">
                    {item.summary}
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <TrendingUp className="h-6 w-6 text-accent-strong" strokeWidth={2} />
                    <div>
                      <p className="font-display text-2xl font-extrabold text-ink">{item.metric}</p>
                      <p className="font-sans text-xs text-muted">{item.metricLabel}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center font-sans text-xs text-muted">
            Solution examples describe Vistrow&apos;s delivery approach. Named client results are
            published only when the underlying data and permission are verified.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
