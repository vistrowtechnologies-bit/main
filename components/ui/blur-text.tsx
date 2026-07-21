"use client";

import { motion, useReducedMotion, type Easing } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type AnimationSnapshot = Record<string, string | number>;

type BlurTextProps = {
  text?: string;
  delay?: number;
  startDelay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: Easing;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "p" | "span";
};

function buildKeyframes(from: AnimationSnapshot, steps: AnimationSnapshot[]) {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))]);
  const keyframes: Record<string, Array<string | number>> = {};

  keys.forEach((key) => {
    let current = from[key] ?? steps.find((step) => step[key] !== undefined)?.[key] ?? 0;
    keyframes[key] = [current];
    steps.forEach((step) => {
      current = step[key] ?? current;
      keyframes[key].push(current);
    });
  });

  return keyframes;
}

export default function BlurText({
  text = "",
  delay = 200,
  startDelay = 0,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = [0.22, 1, 0.36, 1],
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p",
}: BlurTextProps) {
  const elements = useMemo(
    () => (animateBy === "words" ? text.trim().split(/\s+/) : Array.from(text)),
    [animateBy, text],
  );
  const [inView, setInView] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = as === "span" ? spanRef.current : paragraphRef.current;
    if (!node || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [as, reduceMotion, rootMargin, threshold]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -36 }
        : { filter: "blur(10px)", opacity: 0, y: 36 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.55,
        y: direction === "top" ? 4 : -4,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const finalSnapshot = toSnapshots[toSnapshots.length - 1] ?? fromSnapshot;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, index) =>
    stepCount === 1 ? 0 : index / (stepCount - 1),
  );
  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots],
  );

  const segments = elements.map((segment, index) => (
    <motion.span
      aria-hidden="true"
      className="inline-block will-change-[transform,filter,opacity]"
      key={`${segment}-${index}`}
      initial={reduceMotion ? false : fromSnapshot}
      animate={reduceMotion ? finalSnapshot : inView ? animateKeyframes : fromSnapshot}
      transition={{
        duration: totalDuration,
        times,
        delay: (startDelay + index * delay) / 1000,
        ease: easing,
      }}
      onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
    >
      {segment === " " ? "\u00A0" : segment}
      {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : null}
    </motion.span>
  ));

  const wrapperStyle: CSSProperties =
    as === "span" ? { display: "inline" } : { display: "flex", flexWrap: "wrap" };

  if (as === "span") {
    return (
      <span ref={spanRef} className={className} style={wrapperStyle} aria-label={text}>
        {segments}
      </span>
    );
  }

  return (
    <p ref={paragraphRef} className={className} style={wrapperStyle} aria-label={text}>
      {segments}
    </p>
  );
}
