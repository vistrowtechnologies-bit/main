import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";
import BlurText from "@/components/ui/blur-text";

export type CtaLink = { label: string; href: string; external?: boolean };

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta = { label: "Book a Growth Audit", href: "/growth-audit" },
  secondaryCta,
  aside,
}: {
  breadcrumb: Crumb[];
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  aside?: React.ReactNode;
}) {
  const titleWordCount = title.trim().split(/\s+/).length;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-65 [background-image:linear-gradient(rgb(var(--line)/0.42)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.42)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_15%,black,transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-0 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[90px]" />
      <div
        className={`container-edge grid items-center gap-12 py-14 lg:py-20 ${
          aside ? "lg:grid-cols-[1.05fr_0.95fr]" : "grid-cols-1"
        }`}
      >
        <div className={aside ? "max-w-2xl" : "mx-auto max-w-3xl text-center"}>
          <div className={aside ? "" : "flex justify-center"}>
            <Breadcrumb items={breadcrumb} />
          </div>
          {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
          <h1 className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink">
            <BlurText
              as="span"
              text={title}
              delay={65}
              stepDuration={0.3}
              direction="top"
              rootMargin="0px 0px -8% 0px"
            />
            {highlight && (
              <>
                {" "}
                <span className="relative isolate inline-block px-[0.08em] text-accent-ink">
                  <span
                    aria-hidden
                    className="absolute -inset-x-[0.04em] inset-y-[0.08em] -z-10 rotate-[-0.6deg] rounded-[0.12em] bg-accent shadow-[0_0_22px_rgb(var(--accent)/0.18)]"
                  />
                  <BlurText
                    as="span"
                    text={highlight}
                    delay={65}
                    startDelay={titleWordCount * 65}
                    stepDuration={0.3}
                    direction="top"
                    rootMargin="0px 0px -8% 0px"
                  />
                </span>
              </>
            )}
          </h1>
          <p
            className={`mt-5 font-sans text-lg leading-[1.65] text-muted ${
              aside ? "max-w-xl" : "mx-auto max-w-2xl"
            }`}
          >
            {subtitle}
          </p>
          <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${aside ? "" : "justify-center"}`}>
            <ActionLink cta={primaryCta} className="btn-primary px-7 py-3.5 text-base" />
            {secondaryCta && (
              <ActionLink cta={secondaryCta} className="btn-secondary px-7 py-3.5 text-base" />
            )}
          </div>
        </div>
        {aside && <div className="relative lg:pl-4">{aside}</div>}
      </div>
    </section>
  );
}

function ActionLink({ cta, className }: { cta: CtaLink; className: string }) {
  const content = (
    <>
      {cta.label}
      {cta.external ? (
        <ExternalLink className="h-4 w-4" strokeWidth={2} />
      ) : (
        <ArrowRight className="h-5 w-5" strokeWidth={2} />
      )}
    </>
  );

  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  );
}
