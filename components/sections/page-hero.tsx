import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";

export type CtaLink = { label: string; href: string };

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
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:radial-gradient(rgb(var(--muted)/0.16)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
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
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-accent-strong">{highlight}</span>
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
            <Link href={primaryCta.href} className="btn-primary px-7 py-3.5 text-base">
              {primaryCta.label}
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-secondary px-7 py-3.5 text-base">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        {aside && <div className="relative lg:pl-4">{aside}</div>}
      </div>
    </section>
  );
}
