"use client";

import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { useState } from "react";

const pillars = [
  {
    tab: "Generate demand",
    eyebrow: "Attract and capture",
    title: "Build demand that enters the system with context.",
    body: "Performance advertising, lead generation, landing pages, SEO, content and conversion tracking designed around qualified pipeline instead of disconnected channel metrics.",
    href: "/digital-marketing",
    label: "Explore digital marketing",
    icon: Target,
    metric: "Qualified",
    metricLabel: "demand, not empty clicks",
    capabilities: [
      "Performance advertising",
      "Lead generation",
      "Landing pages and funnels",
      "Conversion tracking",
    ],
    flow: ["Campaign", "Conversion", "Lead captured"],
  },
  {
    tab: "Convert enquiries",
    eyebrow: "Respond and qualify",
    title: "Turn every enquiry into a managed opportunity.",
    body: "CRM implementation, AI voice calling, sales automation, WhatsApp, email, SMS and lead routing work together so the next action happens without delay.",
    href: "/business-automation",
    label: "Explore business automation",
    icon: Workflow,
    metric: "Seconds",
    metricLabel: "from enquiry to response",
    capabilities: [
      "CRM and lead management",
      "AI voice calling",
      "Automated follow-up",
      "Sales workflow automation",
    ],
    flow: ["New enquiry", "AI qualification", "CRM owner"],
  },
  {
    tab: "Scale the system",
    eyebrow: "Products and platforms",
    title: "Use purpose-built software where generic tools fall short.",
    body: "Vistrow Voice handles multilingual AI conversations, ArthaLeads manages real-estate leads, and Vistrow Labs builds SaaS and internal tools around the way your team works.",
    href: "/products",
    label: "Explore Vistrow products",
    icon: Boxes,
    metric: "24/7",
    metricLabel: "coverage across the journey",
    capabilities: [
      "Vistrow Voice",
      "ArthaLeads CRM",
      "Custom SaaS products",
      "Internal business tools",
    ],
    flow: ["Conversation", "Qualification", "Pipeline"],
  },
];

export function HomeSearchIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];

  return (
    <section
      className="relative overflow-hidden border-y border-line bg-surface py-section"
      aria-labelledby="what-vistrow-does"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgb(var(--line)/0.4)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.4)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 h-[440px] w-[440px] rounded-full bg-accent/10 blur-[110px]"
      />

      <div className="container-edge relative">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
          <div className="max-w-3xl">
            <span className="eyebrow">Explore the growth system</span>
            <h2 id="what-vistrow-does" className="mt-4 font-display text-h2 text-ink">
              Marketing is only the start. <span className="text-muted">The system closes the loop.</span>
            </h2>
          </div>
          <p className="font-sans text-base leading-relaxed text-muted lg:pb-1 lg:text-lg">
            Choose where growth is getting stuck to see how Vistrow connects demand, response, operations and revenue.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-card shadow-lift sm:mt-12">
          <div
            className="flex overflow-x-auto border-b border-line bg-bg/80 p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Vistrow growth system"
          >
            {pillars.map((pillar, index) => (
              <button
                key={pillar.tab}
                type="button"
                id={`growth-tab-${index}`}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`growth-panel-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`group inline-flex min-w-[190px] flex-1 items-center gap-3 rounded-lg px-4 py-3.5 text-left font-sans text-sm font-semibold transition-all sm:min-w-0 sm:px-5 ${
                  activeIndex === index
                    ? "bg-accent text-accent-ink shadow-[0_8px_26px_rgb(var(--accent)/0.18)]"
                    : "text-muted hover:bg-surface hover:text-ink"
                }`}
              >
                <span
                  className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-[11px] font-extrabold ${
                    activeIndex === index ? "bg-accent-ink/10" : "border border-line bg-card"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {pillar.tab}
              </button>
            ))}
          </div>

          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isActive = activeIndex === index;
            return (
              <div
                key={pillar.tab}
                id={`growth-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`growth-tab-${index}`}
                hidden={!isActive}
                className={isActive ? "animate-rise-in" : ""}
              >
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="flex flex-col p-6 sm:p-9 lg:p-12">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-ink shadow-[0_0_28px_rgb(var(--accent)/0.2)]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-accent-strong">
                        {pillar.eyebrow}
                      </p>
                    </div>
                    <h3 className="mt-7 max-w-2xl font-display text-[clamp(1.8rem,3vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted">
                      {pillar.body}
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {pillar.capabilities.map((capability) => (
                        <div key={capability} className="flex items-center gap-2.5 font-sans text-sm font-medium text-ink-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-strong" strokeWidth={2} />
                          {capability}
                        </div>
                      ))}
                    </div>
                    <Link href={pillar.href} className="btn-ghost mt-9 self-start">
                      {pillar.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="relative min-h-[390px] overflow-hidden border-t border-white/10 bg-[#0f1210] p-6 text-white sm:p-9 lg:min-h-[520px] lg:border-l lg:border-t-0 lg:p-10">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgb(255_255_255/0.13)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.13)_1px,transparent_1px)] [background-size:42px_42px]"
                    />
                    <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                        <div>
                          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-accent-strong">Live system map</p>
                          <p className="mt-2 font-display text-lg font-bold text-white">{pillar.tab}</p>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-[11px] font-semibold text-white/65">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                          Connected
                        </span>
                      </div>

                      <div className="my-auto py-9">
                        <div className="space-y-3">
                          {pillar.flow.map((step, stepIndex) => (
                            <div key={step} className="group relative flex items-center gap-4">
                              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-display text-sm font-extrabold text-accent-strong transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                                {String(stepIndex + 1).padStart(2, "0")}
                              </span>
                              <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5">
                                <p className="font-sans text-sm font-semibold text-white">{step}</p>
                              </div>
                              {stepIndex < pillar.flow.length - 1 && (
                                <span className="absolute left-6 top-full h-3 w-px bg-accent/50" aria-hidden />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-[auto_1fr] items-end gap-5 border-t border-white/10 pt-6">
                        <div>
                          <p className="font-display text-4xl font-extrabold tracking-[-0.05em] text-accent-strong">{pillar.metric}</p>
                          <p className="mt-1 max-w-[170px] font-sans text-xs leading-relaxed text-white/60">{pillar.metricLabel}</p>
                        </div>
                        <div className="flex justify-end">
                          <Sparkles className="h-10 w-10 text-accent-strong/40" strokeWidth={1.2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
