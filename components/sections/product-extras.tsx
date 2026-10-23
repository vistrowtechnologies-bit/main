import { Check, Mic } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { ProductContent } from "@/lib/content-types";

type DemoCall = NonNullable<ProductContent["demoCall"]>;
type Languages = NonNullable<ProductContent["languages"]>;
type Plans = NonNullable<ProductContent["plans"]>;

// A sample call as a transcript beside what gets saved, so visitors see the outcome, not just the voice.
export function ProductDemoCall({ call }: { call: DemoCall }) {
  return (
    <section className="py-section">
      <div className="container-edge grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Sample call</p>
          <h2 className="mt-3 font-display text-h2 text-ink">{call.title}</h2>
          <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-muted">{call.body}</p>
          {call.href && (
            <a href={call.href} target="_blank" rel="noreferrer" className="btn-primary mt-8 px-6 py-3 text-base">
              <Mic className="h-4 w-4" /> Talk to Artha live
            </a>
          )}
        </Reveal>
        <Reveal delay={0.06}>
          <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-lift">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-5 py-3">
              <span className="font-sans text-sm font-semibold text-ink">Artha · {call.language}</span>
              <span className="rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-ink">{call.label}</span>
            </div>
            <ol className="space-y-3 p-5">
              {call.turns.map((turn, index) => (
                <li key={index} className={`flex ${turn.speaker === "caller" ? "justify-end" : ""}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${turn.speaker === "caller" ? "rounded-br-sm bg-accent text-accent-ink" : "rounded-bl-sm bg-surface text-ink"}`}>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] opacity-60">{turn.speaker === "caller" ? "Caller" : "Artha"}</p>
                    <p className="mt-1 font-sans text-[15px] leading-relaxed">{turn.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <dl className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4">
              {call.saved.map((field) => (
                <div key={field.label} className="bg-card px-4 py-3">
                  <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{field.label}</dt>
                  <dd className="mt-1 font-sans text-sm font-semibold text-ink">{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProductLanguages({ languages }: { languages: Languages }) {
  return (
    <section className="border-y border-line bg-surface py-section">
      <div className="container-edge">
        <div className="max-w-3xl">
          <p className="eyebrow">Languages</p>
          <h2 className="mt-3 font-display text-h2 text-ink">{languages.title}</h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-muted">{languages.body}</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {languages.items.map((item) => (
            <li key={item.name} className="rounded-lg border border-line bg-card px-4 py-5">
              <p className="font-display text-2xl font-bold text-ink">{item.native}</p>
              <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductPlans({ plans }: { plans: Plans }) {
  return (
    <section className="py-section">
      <div className="container-edge">
        <div className="max-w-3xl">
          <p className="eyebrow">Plans</p>
          <h2 className="mt-3 font-display text-h2 text-ink">{plans.title}</h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-muted">{plans.body}</p>
        </div>
        <div className="mt-10 grid gap-gutter md:grid-cols-3">
          {plans.items.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06}>
              <article className={`h-full rounded-xl border p-6 ${index === 1 ? "border-accent bg-card shadow-lift" : "border-line bg-card"}`}>
                <h3 className="font-display text-h3 text-ink">{plan.name}</h3>
                <p className="mt-1 font-sans text-sm font-semibold text-accent-strong">Pricing on request</p>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted">{plan.summary}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 font-sans text-[15px] text-ink-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-sans text-sm text-muted">{plans.note}</p>
      </div>
    </section>
  );
}
