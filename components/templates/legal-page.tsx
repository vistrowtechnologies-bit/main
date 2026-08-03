import Link from "next/link";
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

          <div className="mt-12 rounded-lg border border-line bg-surface p-5 font-sans text-sm leading-relaxed text-muted">
            Questions about this policy can be sent to{" "}
            <a className="font-semibold text-accent-strong hover:underline" href="mailto:hello@vistrow.com">
              hello@vistrow.com
            </a>{" "}
            or through our{" "}
            <Link className="font-semibold text-accent-strong hover:underline" href="/contact">
              contact page
            </Link>
            .
          </div>
        </div>
      </div>
    </article>
  );
}
