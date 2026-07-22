"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  BadgeDollarSign,
  Check,
  ClipboardCheck,
  Magnet,
  MessageSquare,
  RefreshCw,
  Target,
  type LucideIcon,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";

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

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.055, delayChildren: 0.035 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.18 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

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
  const particleY = useTransform(smoothProgress, [0, 1], [24, 327]);
  const glowY = useTransform(smoothProgress, [0, 1], [-4, 294]);

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
    <>
      <MobileConversionEngine activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="hidden lg:block">
        <section
          ref={processRef}
          className="relative h-[390vh] bg-[#0d0d0d] text-[#f5f7fa]"
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
            <div className="relative flex min-h-[235px] flex-col rounded-xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8 lg:min-h-[360px]">
              <div className="absolute bottom-6 left-0 top-6 w-[3px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-top bg-accent shadow-[0_0_16px_rgb(var(--accent)/0.65)]"
                  style={{ scaleY: smoothProgress }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.label}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  aria-live="polite"
                >
                  <motion.div variants={childVariants} className="flex items-center justify-between gap-4">
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      Stage {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <StageSignal index={activeIndex} />
                      <motion.div
                        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-accent shadow-[0_0_24px_rgb(var(--accent)/0.28)]"
                        animate={{ rotate: activeIndex === 4 ? 360 : 0, scale: [1, 1.06, 1] }}
                        transition={{ rotate: { duration: 1.2 }, scale: { duration: 0.5 } }}
                      >
                        <ActiveIcon className="h-5 w-5 text-accent-ink" strokeWidth={2} />
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.p variants={childVariants} className="mt-5 font-sans text-sm font-semibold text-[#a7adb8]">
                    {activeStep.desc}
                  </motion.p>
                  <motion.h3 variants={childVariants} className="mt-1 font-display text-3xl font-extrabold tracking-tight text-[#f5f7fa] sm:text-4xl">
                    {activeStep.label}
                  </motion.h3>
                  <motion.p variants={childVariants} className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-[#c6cad1] sm:text-base">
                    {activeStep.detail}
                  </motion.p>
                  <motion.div variants={childVariants} className="mt-6 flex items-center gap-2.5 rounded-sm border border-accent/25 bg-accent/10 px-4 py-3">
                    <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span className="font-sans text-sm font-semibold text-[#f5f7fa]">{activeStep.outcome}</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between gap-5 border-t border-white/10 pt-5">
                  <span className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#777d87]">
                    {activeIndex === steps.length - 1 ? "Journey complete" : "Coming next"}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToStage(Math.min(steps.length - 1, activeIndex + 1))}
                    className="group flex items-center gap-2 font-sans text-xs font-semibold text-[#f5f7fa] transition-colors hover:text-accent disabled:cursor-default disabled:text-accent"
                    disabled={activeIndex === steps.length - 1}
                  >
                    {activeIndex === steps.length - 1 ? "Revenue connected" : steps[activeIndex + 1].label}
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl pb-3">
              <div className="mb-2 flex justify-between px-3 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#777d87]">
                <span>More volume</span>
                <span>Higher intent</span>
              </div>
              <div className="relative">
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 z-0 h-20 w-[72%] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
                  style={{ y: glowY }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-[29%] top-0 z-30 -ml-1.5 h-3 w-3 rounded-full border border-white/60 bg-accent shadow-[0_0_8px_rgb(var(--accent)),0_0_24px_rgb(var(--accent)/0.8)]"
                  style={{ y: particleY }}
                >
                  <span className="absolute inset-[-7px] animate-ping rounded-full border border-accent/30" />
                </motion.div>

              <ol className="relative z-10 flex flex-col items-center gap-1.5" aria-label="Conversion funnel stages">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const active = index === activeIndex;
                  const complete = index < activeIndex;
                  return (
                    <motion.li
                      key={step.label}
                      animate={{
                        opacity: index <= activeIndex ? 1 : 0.38,
                        scale: active ? 1.035 : complete ? 1.005 : 0.985,
                        x: active ? 6 : 0,
                        filter: active ? "brightness(1.08)" : "brightness(1)",
                      }}
                      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
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
                        style={{
                          clipPath: "polygon(3% 0, 97% 0, 92% 100%, 8% 100%)",
                          background: complete
                            ? "linear-gradient(90deg, rgb(var(--accent) / 0.12), rgb(var(--accent) / 0.25), rgb(var(--accent) / 0.12))"
                            : undefined,
                        }}
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
                          <>
                            <motion.span
                              layoutId="funnel-pulse"
                              className="absolute inset-0 border border-black/10"
                              style={{ clipPath: "polygon(3% 0, 97% 0, 92% 100%, 8% 100%)" }}
                            />
                            <motion.span
                              aria-hidden
                              className="absolute inset-y-0 w-16 -skew-x-12 bg-white/35 blur-md"
                              initial={{ left: "-20%" }}
                              animate={{ left: "120%" }}
                              transition={{ duration: 0.9, delay: 0.08, ease: "easeOut" }}
                            />
                          </>
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </ol>
              </div>
              <motion.div
                className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-sans text-xs font-semibold text-accent"
                animate={{
                  opacity: activeIndex === steps.length - 1 ? 1 : 0.38,
                  scale: activeIndex === steps.length - 1 ? 1.04 : 1,
                  boxShadow:
                    activeIndex === steps.length - 1
                      ? "0 0 34px rgb(var(--accent) / 0.2)"
                      : "0 0 0 rgb(var(--accent) / 0)",
                }}
                transition={{ duration: 0.35 }}
              >
                <motion.span
                  className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.75)]"
                  animate={{ scale: activeIndex === steps.length - 1 ? [1, 1.7, 1] : 1 }}
                  transition={{ duration: 1.2, repeat: activeIndex === steps.length - 1 ? Infinity : 0 }}
                />
                Revenue connected back to source
              </motion.div>
            </div>
          </div>
        </div>
      </div>
        </section>
      </div>
    </>
  );
}

function MobileConversionEngine({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) {
  const goToMobileStage = (index: number) => {
    setActiveIndex(index);
    document
      .getElementById(`mobile-conversion-stage-${index}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="relative overflow-clip bg-[#0d0d0d] text-[#f5f7fa] lg:hidden" aria-label="The Vistrow Conversion Engine">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-72 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />

      <div className="container-edge relative pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="eyebrow">The connected process</span>
            <span className="h-px w-7 bg-accent/60" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a7adb8]">
              Scroll to advance
            </span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,7.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#f5f7fa]">
            From attention to revenue, one stage at a time
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#a7adb8] sm:text-base">
            Follow an opportunity through each connected stage as intent becomes measurable growth.
          </p>
        </div>

        <div className="sticky top-[72px] z-20 -mx-5 mt-9 border-y border-white/10 bg-[#0d0d0d]/90 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <div>
              <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-[#777d87]">Journey progress</p>
              <p className="mt-0.5 font-sans text-xs font-semibold text-[#f5f7fa]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")} · {steps[activeIndex].label}
              </p>
            </div>
            <div className="flex items-center gap-1.5" aria-label="Choose a conversion stage">
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => goToMobileStage(index)}
                  aria-label={`Go to stage ${index + 1}: ${step.label}`}
                  aria-pressed={activeIndex === index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-7 bg-accent shadow-[0_0_14px_rgb(var(--accent)/0.5)]"
                      : index < activeIndex
                        ? "w-2.5 bg-accent/45"
                        : "w-2.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <ScrollStack
          className="mx-auto mt-5 max-w-3xl"
          ariaLabel="Conversion journey stages"
          itemDistance={72}
          itemScale={0.018}
          itemStackDistance={13}
          stackPosition="23%"
          scaleEndPosition="11%"
          baseScale={0.89}
          rotationAmount={0.12}
          blurAmount={0.55}
          onActiveIndexChange={setActiveIndex}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeIndex === index;
            return (
              <ScrollStackItem
                key={step.label}
                id={`mobile-conversion-stage-${index}`}
                itemClassName="scroll-mt-40"
              >
                <article
                  className={`relative min-h-[360px] overflow-hidden rounded-2xl border p-6 transition-[border-color,background-color,box-shadow] duration-300 sm:min-h-[390px] sm:p-8 ${
                    isActive
                      ? "border-accent/50 bg-[#191b19] shadow-[0_22px_70px_rgba(0,0,0,0.42),0_0_40px_rgb(var(--accent)/0.07)]"
                      : "border-white/10 bg-[#151615] shadow-[0_20px_55px_rgba(0,0,0,0.34)]"
                  }`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
                  />
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.17em] text-accent">
                        Stage {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-4 font-sans text-xs font-semibold text-[#a7adb8] sm:text-sm">{step.desc}</p>
                      <h3 className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#f5f7fa] sm:text-4xl">
                        {step.label}
                      </h3>
                    </div>
                    <div className="relative shrink-0">
                      {isActive && <StageSignal index={index} />}
                      <motion.div
                        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_0_24px_rgb(var(--accent)/0.24)]"
                        animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </motion.div>
                    </div>
                  </div>

                  <p className="mt-5 font-sans text-sm leading-relaxed text-[#c6cad1] sm:text-base">{step.detail}</p>
                  <div className="mt-6 flex items-start gap-3 rounded-lg border border-accent/20 bg-accent/[0.08] px-4 py-3.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span className="font-sans text-sm font-semibold leading-snug text-[#f5f7fa]">{step.outcome}</span>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5">
                    {steps.map((_, progressIndex) => (
                      <motion.span
                        key={progressIndex}
                        className={`h-1.5 flex-1 rounded-full ${progressIndex <= index ? "bg-accent" : "bg-white/10"}`}
                        initial={false}
                        animate={{ opacity: progressIndex <= index ? 1 : 0.55 }}
                      />
                    ))}
                  </div>
                </article>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>

        <motion.div
          className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2.5 font-sans text-xs font-semibold text-accent"
          initial={{ opacity: 0.45 }}
          whileInView={{ opacity: 1, scale: [0.98, 1.03, 1] }}
          viewport={{ amount: 0.8 }}
        >
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.75)]" />
          Revenue connected back to source
        </motion.div>
      </div>
    </section>
  );
}

function StageSignal({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-[-16px]">
        {[-1, 0, 1].map((position, i) => (
          <motion.span
            key={position}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent"
            initial={{ x: position * 28, y: (i - 1) * 13, opacity: 0 }}
            animate={{ x: position * 13, y: 0, opacity: [0, 1, 0.45] }}
            transition={{ duration: 0.8, delay: i * 0.08, repeat: Infinity, repeatDelay: 0.35 }}
          />
        ))}
      </div>
    );
  }

  if (index === 1) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-[-15px]">
        {[0, 1].map((ring) => (
          <motion.span
            key={ring}
            className="absolute inset-0 rounded-full border border-accent/45"
            initial={{ scale: 1.55, opacity: 0 }}
            animate={{ scale: 0.75, opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.05, delay: ring * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
    );
  }

  if (index === 2) {
    return (
      <div aria-hidden className="pointer-events-none absolute -right-3 bottom-0 flex h-8 items-end gap-1">
        {[10, 20, 14, 25].map((height, i) => (
          <motion.span
            key={height}
            className="w-1 rounded-full bg-accent/70"
            animate={{ height: [6, height, 8] }}
            transition={{ duration: 0.72, delay: i * 0.08, repeat: Infinity, repeatType: "mirror" }}
          />
        ))}
      </div>
    );
  }

  if (index === 3) {
    return (
      <div aria-hidden className="pointer-events-none absolute -right-5 top-1/2 flex -translate-y-1/2 flex-col items-end gap-1.5">
        {[14, 22, 30].map((width, i) => (
          <motion.span
            key={width}
            className="h-1 rounded-full bg-accent/60"
            style={{ width }}
            animate={{ scaleX: [0.35, 1, 0.6], opacity: [0.35, 1, 0.55] }}
            transition={{ duration: 0.9, delay: i * 0.1, repeat: Infinity, repeatType: "mirror" }}
          />
        ))}
      </div>
    );
  }

  if (index === 4) {
    return (
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-12px] rounded-full border border-dashed border-accent/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent))]" />
        <span className="absolute bottom-[-3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent/60" />
      </motion.div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-[-16px]">
      {[0, 1].map((ring) => (
        <motion.span
          key={ring}
          className="absolute inset-0 rounded-full border border-accent/50"
          animate={{ scale: [0.7, 1.45], opacity: [0.8, 0] }}
          transition={{ duration: 1.15, delay: ring * 0.42, repeat: Infinity }}
        />
      ))}
    </div>
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
