"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Database,
  FlaskConical,
  Waves,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ScrollParallax } from "@/components/ui/motion-primitives";

const products = [
  {
    name: "Vistrow Voice",
    href: "/products/vistrow-voice",
    body: "India-native AI voice agents for inbound, outbound, and web calls in 10 languages - available 24/7.",
    icon: Phone,
    accent: "border-l-accent",
    status: "On call",
    metric: "10 Indian languages",
    rows: [
      ["Inbound calls", "Answering"],
      ["Knowledge base", "Grounded"],
      ["CRM webhook", "Connected"],
    ],
    bars: [30, 60, 40, 80, 55, 95, 45, 70, 35, 85, 50, 65, 40, 75, 30],
  },
  {
    name: "ArthaLeads",
    href: "/products/arthaleads",
    body: "A real-estate CRM that brings Facebook, Google, WhatsApp, and website leads into one workspace.",
    icon: Database,
    accent: "border-l-accent-strong",
    status: "Pipeline live",
    metric: "Property leads in one place",
    rows: [
      ["Lead sources", "Connected"],
      ["Team assignment", "Active"],
      ["Site visits", "Tracked"],
    ],
    bars: [45, 68, 52, 88, 64, 76, 92, 58, 72, 82, 66, 90, 62, 78, 55],
  },
  {
    name: "Vistrow Labs",
    href: "/products/vistrow-labs",
    body: "Custom SaaS and internal tools built to fit the way your team actually works.",
    icon: FlaskConical,
    accent: "border-l-muted",
    status: "Sprint active",
    metric: "3 workflows shipped",
    rows: [
      ["Current sprint", "Automation hub"],
      ["Tasks complete", "18 / 24"],
      ["Next release", "Friday"],
    ],
    bars: [38, 46, 58, 70, 76, 84, 92, 88, 80, 72, 64, 58, 50, 44, 38],
  },
];

export function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = products[activeIndex];
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface py-section">
      <div className="container-edge grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
        <div>
          <Reveal direction="right">
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
              <Reveal key={product.name} delay={i * 0.07} direction="right">
                <Link
                  href={product.href}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  aria-describedby={`product-${i}-hint`}
                  className={`glass glass-hover group flex items-start gap-4 rounded-lg border-l-4 p-6 ${product.accent} ${
                    activeIndex === i ? "ring-1 ring-accent/50" : ""
                  }`}
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
                    <span id={`product-${i}-hint`} className="mt-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
                      <span className="sm:hidden">Tap to explore</span>
                      <span className="hidden sm:inline">Hover to preview · Click to explore</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28">
          <Reveal delay={0.1} direction="left" className="relative">
            <ScrollParallax distance={18}>
              <div className="glass overflow-hidden rounded-xl p-5 shadow-lift">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.name}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center justify-between border-b border-line/70 pb-3">
                      <div className="flex items-center gap-2">
                        <active.icon className="h-4 w-4 text-accent-strong" />
                        <span className="font-sans text-[13px] font-semibold text-ink">{active.name}</span>
                      </div>
                      <span className="rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-ink">
                        {active.status}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                        <active.icon className="h-5 w-5 text-accent-ink" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <p className="mb-2 font-sans text-xs font-semibold text-ink">{active.metric}</p>
                        <div className="flex h-10 items-center gap-[3px]">
                          {active.bars.map((height, i) => (
                            <motion.div
                              key={`${active.name}-${i}`}
                              className="flex-1 rounded-full bg-accent-strong/60"
                              initial={reduce ? false : { height: "12%" }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 0.45, delay: i * 0.025 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      {active.rows.map(([label, value], i) => (
                        <motion.div
                          key={label}
                          className="flex items-center justify-between rounded-sm border border-line/70 bg-card/70 px-4 py-2.5"
                          initial={reduce ? false : { opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + i * 0.06 }}
                        >
                          <span className="font-sans text-[13px] text-muted">{label}</span>
                          <span className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-ink">
                            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                            {value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -right-3 -top-4 hidden animate-float items-center gap-2 rounded-lg glass p-3 shadow-soft sm:flex">
                <Waves className="h-4 w-4 text-accent-strong" strokeWidth={2} />
                <span className="font-sans text-xs font-semibold text-ink">Live product preview</span>
              </div>
            </ScrollParallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
