"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Phone, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { CountUp } from "@/components/ui/motion-primitives";

/**
 * Connected marketing + lead-management interface mock.
 * Pure CSS/SVG - no external assets or WebGL - so it stays fast and theme-aware.
 */
export function HeroDashboard() {
  const bars = [38, 52, 44, 66, 58, 78, 72, 90];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="relative w-full">
      {/* soft accent bloom behind the panel */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/10 blur-[90px]" />

      <div className="glass rounded-xl p-4 shadow-lift sm:p-5">
        {/* header row */}
        <div className="flex items-center justify-between border-b border-line/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-sans text-[13px] font-semibold text-ink">
              Connected Growth Demo
            </span>
          </div>
          <span className="rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-ink">
            Illustrative
          </span>
        </div>

        {/* KPI row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Indian languages", end: 10, decimals: 0, suffix: "", icon: Users },
            { label: "Calling channels", end: 3, decimals: 0, suffix: "", icon: TrendingUp },
            { label: "Always active", end: 24, decimals: 0, suffix: "/7", icon: Phone },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="rounded-sm border border-line/70 bg-card/70 p-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.28 + i * 0.08, duration: 0.45 }}
            >
              <kpi.icon className="h-4 w-4 text-accent-strong" strokeWidth={1.75} />
              <p className="mt-2 font-display text-lg font-extrabold text-ink">
                <CountUp end={kpi.end} decimals={kpi.decimals} suffix={kpi.suffix} />
              </p>
              <p className="font-sans text-[11px] text-muted">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* chart */}
        <div className="mt-3 rounded-sm border border-line/70 bg-card/70 p-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[12px] font-medium text-ink-2">
              Connected workflow activity
            </span>
            <span className="font-sans text-[11px] font-semibold text-success">All systems connected</span>
          </div>
          <div className="mt-4 flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-t-[3px] ${
                  i === bars.length - 1 ? "bg-accent" : "bg-accent/25"
                }`}
                initial={reduce ? false : { height: 0 }}
                animate={inView ? { height: `${h}%` } : undefined}
                transition={{
                  duration: 0.65,
                  delay: 0.35 + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
        </div>

        {/* pipeline / follow-up row */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-sm border border-line/70 bg-card/70 p-3">
            <p className="font-sans text-[11px] text-muted">Pipeline</p>
            <div className="mt-2 space-y-2">
              {[
                { stage: "Inbound", w: "82%" },
                { stage: "Outbound", w: "54%" },
                { stage: "Website", w: "36%" },
              ].map((row) => (
                <div key={row.stage}>
                  <div className="flex justify-between">
                    <span className="font-sans text-[11px] text-ink-2">{row.stage}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-line/70">
                    <motion.div
                      className="h-full rounded-full bg-accent-strong"
                      initial={reduce ? false : { width: 0 }}
                      animate={inView ? { width: row.w } : undefined}
                      transition={{ duration: 0.7, delay: 0.65 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-line/70 bg-card/70 p-3">
            <p className="font-sans text-[11px] text-muted">Follow-up status</p>
            <ul className="mt-2 space-y-2">
              {["Auto SMS sent", "Call booked", "Email nurture"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" strokeWidth={2} />
                  <span className="font-sans text-[11px] text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* floating conversion chip */}
      <div className="absolute -bottom-5 -left-3 hidden animate-float items-center gap-3 rounded-lg glass p-3 shadow-soft sm:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent">
          <TrendingUp className="h-5 w-5 text-accent-ink" strokeWidth={2} />
        </div>
        <div>
          <p className="font-sans text-[11px] text-muted">Always-on response</p>
          <p className="font-display text-base font-extrabold text-ink">24/7 coverage</p>
        </div>
      </div>
    </div>
  );
}
