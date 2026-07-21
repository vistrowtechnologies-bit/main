"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Magnet,
  Target,
  MessageSquare,
  ClipboardCheck,
  RefreshCw,
  BadgeDollarSign,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { label: "Attract", desc: "Targeted acquisition", icon: Magnet },
  { label: "Capture", desc: "Optimised funnels", icon: Target },
  { label: "Respond", desc: "Instant outreach", icon: MessageSquare },
  { label: "Qualify", desc: "AI-driven sorting", icon: ClipboardCheck },
  { label: "Follow Up", desc: "Nurture sequences", icon: RefreshCw },
  { label: "Convert", desc: "Measured ROI", icon: BadgeDollarSign, active: true },
];

export function ConversionEngine() {
  const processRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 78%", "end 45%"],
  });

  return (
    <section className="overflow-hidden py-section">
      <div className="container-edge">
        <div className="text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="eyebrow">The connected process</span>
            <h2 className="mt-4 font-display text-h2 text-ink">
              The Vistrow Conversion Engine
            </h2>
            <p className="mt-4 font-sans text-lg text-muted">
              One connected methodology from first click to closed deal.
            </p>
          </Reveal>
        </div>

        <div ref={processRef} className="relative mt-16">
          {/* connector line */}
          <div className="absolute left-[8.333%] right-[8.333%] top-8 -z-10 hidden h-[2px] overflow-hidden bg-line lg:block">
            <motion.div
              className="h-full origin-left bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.65)]"
              style={{ scaleX: reduce ? 1 : scrollYProgress }}
            />
          </div>
          <ol className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.label}
                icon={step.icon}
                label={step.label}
                desc={step.desc}
                progress={scrollYProgress}
                threshold={i / (steps.length - 1)}
                reduce={Boolean(reduce)}
              />
            ))}
          </ol>
          <Reveal delay={0.15} className="mx-auto mt-12 max-w-xl text-center">
            <p className="font-sans text-sm leading-relaxed text-muted">
              Scroll through the system to see how every stage compounds into measurable growth.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  icon: Icon,
  label,
  desc,
  progress,
  threshold,
  reduce,
}: {
  icon: LucideIcon;
  label: string;
  desc: string;
  progress: MotionValue<number>;
  threshold: number;
  reduce: boolean;
}) {
  const start = Math.max(0, threshold - 0.09);
  const end = Math.min(1, threshold + 0.09);
  const activeOpacity = useTransform(progress, [start, end], [0, 1]);
  const activeScale = useTransform(progress, [start, end], [0.82, 1]);
  const labelOpacity = useTransform(activeOpacity, [0, 1], [0.62, 1]);

  return (
    <li className="flex flex-col items-center text-center">
      <motion.div
        className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-line bg-card transition-transform hover:scale-110"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-[-2px] rounded-full border-2 border-accent bg-accent shadow-[0_0_28px_rgb(var(--accent)/0.4)]"
          style={{ opacity: reduce ? 1 : activeOpacity, scale: reduce ? 1 : activeScale }}
        />
        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-[0_0_20px_rgb(var(--accent)/0.2)]">
          <Icon className="h-6 w-6 text-accent-ink" strokeWidth={2} />
        </span>
      </motion.div>
      <motion.h3
        className="mt-4 font-sans text-sm font-bold text-ink"
        style={{ opacity: reduce ? 1 : labelOpacity }}
      >
        {label}
      </motion.h3>
      <p className="mt-1 font-sans text-xs text-muted">{desc}</p>
    </li>
  );
}
