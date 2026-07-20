import Link from "next/link";
import { ArrowRight, Phone, Database, FlaskConical, Waves } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const products = [
  {
    name: "Vistrow Voice",
    href: "/products/vistrow-voice",
    body: "AI voice responders that qualify leads by phone 24/7 and book appointments straight into your calendar.",
    icon: Phone,
    accent: "border-l-accent",
  },
  {
    name: "ArthaLeads",
    href: "/products/arthaleads",
    body: "A high-intent lead-generation engine that sources prospects across channels into one clean dashboard.",
    icon: Database,
    accent: "border-l-accent-strong",
  },
  {
    name: "Vistrow Labs",
    href: "/products/vistrow-labs",
    body: "Custom SaaS and internal tools built to fit the way your team actually works.",
    icon: FlaskConical,
    accent: "border-l-muted",
  },
];

export function Products() {
  return (
    <section className="bg-surface py-section">
      <div className="container-edge grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow">The stack</span>
            <h2 className="mt-4 font-display text-h2 text-ink">
              Proprietary products that strengthen the system
            </h2>
            <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-muted">
              Software that plugs into your marketing to respond faster, qualify smarter,
              and convert more of what you already generate.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {products.map((product, i) => (
              <Reveal key={product.name} delay={i * 0.07}>
                <Link
                  href={product.href}
                  className={`glass glass-hover group flex items-start gap-4 rounded-lg border-l-4 p-6 ${product.accent}`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-surface">
                    <product.icon className="h-5 w-5 text-accent-strong" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-ink">{product.name}</h3>
                      <ArrowRight
                        className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-muted">
                      {product.body}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* product interface preview */}
        <Reveal delay={0.1} className="relative">
          <div className="glass overflow-hidden rounded-xl p-5 shadow-lift">
            <div className="flex items-center justify-between border-b border-line/70 pb-3">
              <span className="font-sans text-[13px] font-semibold text-ink">Vistrow Voice</span>
              <span className="rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-strong">
                On call
              </span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Phone className="h-5 w-5 text-accent-ink" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex h-10 items-center gap-[3px]">
                  {[30, 60, 40, 80, 55, 95, 45, 70, 35, 85, 50, 65, 40, 75, 30].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-accent-strong/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {[
                { label: "Intent detected", value: "High" },
                { label: "Appointment", value: "Booked · Thu 3:00" },
                { label: "Synced to CRM", value: "Done" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-sm border border-line/70 bg-card/70 px-4 py-2.5"
                >
                  <span className="font-sans text-[13px] text-muted">{row.label}</span>
                  <span className="font-sans text-[13px] font-semibold text-ink">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -right-3 -top-4 hidden animate-float items-center gap-2 rounded-lg glass p-3 shadow-soft sm:flex">
            <Waves className="h-4 w-4 text-accent-strong" strokeWidth={2} />
            <span className="font-sans text-xs font-semibold text-ink">Real-time qualify</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
