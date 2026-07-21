import { Breadcrumb } from "@/components/ui/breadcrumb";
import BlurText from "@/components/ui/blur-text";
import type { LegalContent } from "@/lib/content-types";

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <article className="py-16 lg:py-20">
      <div className="container-edge">
        <div className="mx-auto max-w-reading">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: content.title }]}
          />
          <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-ink">
            <BlurText as="span" text={content.title} delay={72} stepDuration={0.3} direction="top" />
          </h1>
          <p className="mt-3 font-sans text-sm text-muted">Last updated: {content.updated}</p>
          <p className="mt-6 font-sans text-lg leading-relaxed text-muted">{content.intro}</p>

          <div className="mt-10 space-y-10">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-h3 text-ink">{section.heading}</h2>
                {section.body.map((para, i) => (
                  <p key={i} className="mt-3 font-sans text-base leading-relaxed text-ink-2">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-line pt-6 font-sans text-sm text-muted">
            This page is a general template and not legal advice. Vistrow Technologies should
            have final policies reviewed by qualified counsel before publication.
          </p>
        </div>
      </div>
    </article>
  );
}
