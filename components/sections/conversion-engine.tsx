"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  BadgeDollarSign,
  Check,
  ClipboardCheck,
  Magnet,
  MessageSquare,
  RefreshCw,
  Target,
  type LucideIcon,
} from "lucide-react";

type FunnelStep = {
  label: string;
  desc: string;
  detail: string;
  outcome: string;
  icon: LucideIcon;
};

const steps: FunnelStep[] = [
  {
    label: "Attract",
    desc: "Targeted acquisition",
    detail: "Put the right offer in front of people who are most likely to need it.",
    outcome: "Qualified attention enters the system",
    icon: Magnet,
  },
  {
    label: "Capture",
    desc: "Optimised funnels",
    detail: "Turn interest into identifiable demand with focused pages, forms, and calls to action.",
    outcome: "Anonymous traffic becomes a lead",
    icon: Target,
  },
  {
    label: "Respond",
    desc: "Instant outreach",
    detail: "Trigger AI voice, WhatsApp, email, or routing as soon as a new enquiry arrives.",
    outcome: "Every lead receives a fast response",
    icon: MessageSquare,
  },
  {
    label: "Qualify",
    desc: "AI-driven sorting",
    detail: "Capture intent, fit, urgency, and next-step readiness before sales spends time.",
    outcome: "The strongest opportunities rise",
    icon: ClipboardCheck,
  },
  {
    label: "Follow Up",
    desc: "Nurture sequences",
    detail: "Keep useful contact moving across calls and messages until the buyer is ready.",
    outcome: "Fewer opportunities go cold",
    icon: RefreshCw,
  },
  {
    label: "Convert",
    desc: "Measured ROI",
    detail: "Connect the final sale back to its source, journey, response, and sales activity.",
    outcome: "Revenue closes the measurement loop",
    icon: BadgeDollarSign,
  },
];

const funnelWidths = ["100%", "90%", "80%", "70%", "60%", "50%"];

export function ConversionEngine() {
  const processRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduce || window.innerWidth < 1024) return;
    const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const goToStage = (index: number) => {
    const section = processRef.current;
    if (!section) return;
    if (reduce || window.innerWidth < 1024) {
      setActiveIndex(index);
      return;
    }
    const top = section.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(0, section.offsetHeight - window.innerHeight);
    const position = top + (index / (steps.length - 1)) * scrollable;
    window.scrollTo({ top: position, behavior: "smooth" });
  };

  if (reduce) return <StaticFunnel />;

  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section
      ref={processRef}
      className="relative bg-[#0d0d0d] text-[#f5f7fa] lg:h-[460vh]"
      aria-label="The Vistrow Conversion Engine"
    >
      <div className="relative flex items-center overflow-hidden py-20 lg:sticky lg:top-0 lg:min-h-screen lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 72% 52%, rgb(var(--accent) / 0.11), transparent 28%), radial-gradient(circle at 28% 58%, rgba(255,255,255,0.05), transparent 24%)",
          }}
        />

        <div className="container-edge relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="eyebrow">The connected process</span>
              <span className="hidden h-px w-8 bg-accent/60 sm:block" />
              <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a7adb8] sm:block">
                Scroll to advance
              </span>
            </div>
            <h2 className="mt-4 font-display text-h2 text-[#f5f7fa]">
              From attention to revenue, one stage at a time
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-[#a7adb8] sm:text-lg">
              Follow an opportunity through the Vistrow Conversion Engine as the funnel narrows and intent becomes measurable growth.
            </p>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <div className="relative min-h-[235px] rounded-xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8 lg:min-h-[330px]">
              <div className="absolute bottom-6 left-0 top-6 w-[3px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-top bg-accent shadow-[0_0_16px_rgb(var(--accent)/0.65)]"
                  style={{ scaleY: smoothProgress }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      Stage {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent shadow-[0_0_24px_rgb(var(--accent)/0.28)]">
                      <ActiveIcon className="h-5 w-5 text-accent-ink" strokeWidth={2} />
                    </div>
                  </div>
                  <p className="mt-5 font-sans text-sm font-semibold text-[#a7adb8]">{activeStep.desc}</p>
                  <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-[#f5f7fa] sm:text-4xl">
                    {activeStep.label}
                  </h3>
                  <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-[#c6cad1] sm:text-base">
                    {activeStep.detail}
                  </p>
                  <div className="mt-6 flex items-center gap-2.5 rounded-sm border border-accent/25 bg-accent/10 px-4 py-3">
                    <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span className="font-sans text-sm font-semibold text-[#f5f7fa]">{activeStep.outcome}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex gap-2 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0">
                {steps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    aria-label={`Go to ${step.label} stage`}
                    aria-pressed={index === activeIndex}
                    onClick={() => goToStage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-8 bg-accent" : index < activeIndex ? "w-4 bg-accent/50" : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl pb-3">
              <div className="mb-2 flex justify-between px-3 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#777d87]">
                <span>More volume</span>
                <span>Higher intent</span>
              </div>
              <ol className="flex flex-col items-center gap-1.5" aria-label="Conversion funnel stages">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const active = index === activeIndex;
                  const complete = index < activeIndex;
                  return (
                    <motion.li
                      key={step.label}
                      animate={{
                        opacity: index <= activeIndex ? 1 : 0.38,
                        scale: active ? 1.025 : 1,
                      }}
                      transition={{ duration: 0.28 }}
                      style={{ width: funnelWidths[index] }}
                    >
                      <button
                        type="button"
                        onClick={() => goToStage(index)}
                        aria-pressed={active}
                        className={`group relative flex h-[48px] w-full items-center justify-center gap-3 overflow-hidden px-5 font-sans transition-colors sm:h-[54px] ${
                          active
                            ? "bg-accent text-accent-ink shadow-[0_0_34px_rgb(var(--accent)/0.24)]"
                            : complete
                              ? "bg-accent/20 text-[#f5f7fa]"
                              : "bg-white/[0.065] text-[#a7adb8] hover:bg-white/10 hover:text-[#f5f7fa]"
                        }`}
                        style={{ clipPath: "polygon(3% 0, 97% 0, 92% 100%, 8% 100%)" }}
                      >
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full ${active ? "bg-black/10" : "bg-white/10"}`}>
                          {complete ? (
                            <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
                          ) : (
                            <Icon className={`h-4 w-4 ${active ? "text-accent-ink" : "text-current"}`} strokeWidth={2} />
                          )}
                        </span>
                        <span className="text-sm font-bold sm:text-[15px]">{step.label}</span>
                        {active && (
                          <motion.span
                            layoutId="funnel-pulse"
                            className="absolute inset-0 border border-black/10"
                            style={{ clipPath: "polygon(3% 0, 97% 0, 92% 100%, 8% 100%)" }}
                          />
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </ol>
              <motion.div
                className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-sans text-xs font-semibold text-accent"
                animate={{ opacity: activeIndex === steps.length - 1 ? 1 : 0.45 }}
              >
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.75)]" />
                Revenue connected back to source
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticFunnel() {
  return (
    <section className="bg-[#0d0d0d] py-section text-[#f5f7fa]" aria-label="The Vistrow Conversion Engine">
      <div className="container-edge">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The connected process</span>
          <h2 className="mt-4 font-display text-h2 text-[#f5f7fa]">From attention to revenue, one stage at a time</h2>
          <p className="mt-4 font-sans text-lg text-[#a7adb8]">Six connected stages that turn qualified attention into measurable growth.</p>
        </div>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.label} className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">Stage {String(index + 1).padStart(2, "0")}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-5 w-5 text-accent-ink" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#f5f7fa]">{step.label}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#a7adb8]">{step.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
