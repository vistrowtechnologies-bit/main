import Image from "next/image";
import { CheckCircle2, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Card, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Outcome } from "@/components/sections/outcomes";
import type { Step } from "@/components/sections/steps";

/** The short answer in one paragraph, then three plain facts. Replaces the three-card "Quick answer". */
export function FactStrip({ answer, facts }: { answer: string; facts: { label: string; value: string }[] }) {
  return (
    <Section tone="surface">
      <Reveal>
        <p className="mx-auto max-w-3xl text-center font-sans text-lg leading-relaxed text-muted">{answer}</p>
      </Reveal>
      {facts.length > 0 && (
        <dl className="mx-auto mt-10 grid max-w-4xl divide-y divide-line rounded-lg border border-line bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((fact) => (
            <div key={fact.label} className="px-6 py-5 text-center sm:py-6">
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-2 font-display text-lg font-bold text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}

/** One section, two cards: what goes wrong today and what changes. */
export function ProblemOutcome({
  problem,
  outcomes,
}: {
  problem: { title: string; body: string; points: string[] };
  outcomes: Outcome[];
}) {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal className="h-full">
          <Card>
            <p className="eyebrow">Sound familiar?</p>
            <h2 className="mt-3 font-display text-h3 text-ink">{problem.title}</h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-muted">{problem.body}</p>
            <ul className="mt-6 space-y-3">
              {problem.points.map((point) => (
                <li key={point} className="flex items-start gap-3 font-sans text-base text-ink-2">
                  <X className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-error/10 p-1 text-error" strokeWidth={3} />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <Card accent>
            <p className="eyebrow">What changes</p>
            <h2 className="mt-3 font-display text-h3 text-ink">What good looks like</h2>
            <ul className="mt-6 space-y-5">
              {outcomes.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex min-w-[4.75rem] justify-center rounded-full bg-accent px-3 py-1 font-sans text-sm font-bold text-accent-ink">
                    {item.stat}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-ink">{item.label}</p>
                    {item.body && <p className="mt-1 font-sans text-base leading-relaxed text-muted">{item.body}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

/** Numbered steps joined by a line: across on desktop, down the left on phones. */
export function Timeline({ steps }: { steps: Step[] }) {
  return (
    <Section tone="surface">
      <SectionHeading eyebrow="How it works" title="A clear, repeatable process" align="center" className="mb-12" />
      <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.07}>
            <li className="relative pl-16 lg:pl-0 lg:pt-16">
              <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-card font-display text-lg font-bold text-ink">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-6 top-12 -bottom-10 w-px bg-line lg:-bottom-auto lg:left-14 lg:right-[-2rem] lg:top-6 lg:h-px lg:w-auto"
                />
              )}
              <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 font-sans text-base leading-relaxed text-muted">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/** What you get, beside a photo, with the tools underneath instead of a section of their own. */
export function Deliverables({
  items,
  tools,
  image,
}: {
  items: string[];
  tools: string[];
  image?: { src: string; alt: string };
}) {
  return (
    <Section>
      <div className={`grid items-start gap-10 lg:gap-16 ${image ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
        {image && (
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-line bg-card shadow-lift">
              <Image src={image.src} alt={image.alt} width={1536} height={1024} sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[4/3] h-auto w-full object-cover" />
            </div>
          </Reveal>
        )}
        <div>
          <SectionHeading eyebrow="What's included" title="What you get" />
          <Reveal delay={0.06}>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-line py-3.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={2} />
                  <span className="font-sans text-base text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8">Works with</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="rounded-full border border-line bg-card px-4 py-1.5 font-sans text-sm font-medium text-ink-2">
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
