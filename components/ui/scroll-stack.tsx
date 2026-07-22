"use client";

import Lenis from "lenis";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./scroll-stack.module.css";

type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
  id?: string;
};

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onActiveIndexChange?: (index: number) => void;
  onStackComplete?: () => void;
};

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

export function ScrollStackItem({ children, itemClassName = "", id }: ScrollStackItemProps) {
  return (
    <div id={id} role="listitem" className={`${styles.card} scroll-stack-card ${itemClassName}`.trim()}>
      {children}
    </div>
  );
}

function parsePosition(value: string | number, viewportHeight: number) {
  if (typeof value === "string" && value.includes("%")) {
    return (Number.parseFloat(value) / 100) * viewportHeight;
  }

  return Number.parseFloat(String(value));
}

function progressBetween(value: number, start: number, end: number) {
  if (value <= start) return 0;
  if (value >= end) return 1;
  return (value - start) / Math.max(1, end - start);
}

export default function ScrollStack({
  children,
  className = "",
  ariaLabel,
  itemDistance = 88,
  itemScale = 0.018,
  itemStackDistance = 13,
  stackPosition = "23%",
  scaleEndPosition = "10%",
  baseScale = 0.89,
  rotationAmount = 0.18,
  blurAmount = 0.7,
  onActiveIndexChange,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const endTopRef = useRef(0);
  const transformsRef = useRef(new Map<number, CardTransform>());
  const lenisFrameRef = useRef<number | null>(null);
  const updateFrameRef = useRef<number | null>(null);
  const activeIndexRef = useRef(-1);
  const completeRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const emitActiveIndex = useCallback(
    (index: number) => {
      if (activeIndexRef.current === index) return;
      activeIndexRef.current = index;
      onActiveIndexChange?.(index);
    },
    [onActiveIndexChange],
  );

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!enabled || !scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    const endElement = scroller.querySelector<HTMLElement>(".scroll-stack-end");
    if (!cards.length || !endElement) return;

    cardsRef.current = cards;

    const measure = () => {
      const scrollerTop = scroller.getBoundingClientRect().top + window.scrollY;
      cardTopsRef.current = cards.map((card) => scrollerTop + card.offsetTop);
      endTopRef.current = scrollerTop + endElement.offsetTop;
    };

    const updateTransforms = () => {
      measure();
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const stackPositionPx = parsePosition(stackPosition, viewportHeight);
      const scaleEndPositionPx = parsePosition(scaleEndPosition, viewportHeight);
      const pinEnd = endTopRef.current - viewportHeight * 0.12;
      const activeLead = Math.min(128, Math.max(88, viewportHeight * 0.105));
      let topCardIndex = 0;

      cardTopsRef.current.forEach((cardTop, index) => {
        const trigger = cardTop - stackPositionPx - itemStackDistance * index - activeLead;
        if (scrollTop >= trigger) topCardIndex = index;
      });

      emitActiveIndex(topCardIndex);

      cards.forEach((card, index) => {
        const cardTop = cardTopsRef.current[index];
        const pinStart = cardTop - stackPositionPx - itemStackDistance * index;
        const scaleEnd = cardTop - scaleEndPositionPx;
        const scaleProgress = progressBetween(scrollTop, pinStart, scaleEnd);
        const targetScale = Math.min(0.985, baseScale + index * itemScale);
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = index * rotationAmount * scaleProgress;
        const depth = Math.max(0, topCardIndex - index);
        const blur = depth * blurAmount;

        let translateY = 0;
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
        }

        const nextTransform: CardTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100,
        };
        const previous = transformsRef.current.get(index);
        const changed =
          !previous ||
          Math.abs(previous.translateY - nextTransform.translateY) > 0.1 ||
          Math.abs(previous.scale - nextTransform.scale) > 0.001 ||
          Math.abs(previous.rotation - nextTransform.rotation) > 0.1 ||
          Math.abs(previous.blur - nextTransform.blur) > 0.1;

        if (changed) {
          card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
          card.style.filter = nextTransform.blur ? `blur(${nextTransform.blur}px)` : "";
          card.style.zIndex = String(index + 1);
          transformsRef.current.set(index, nextTransform);
        }
      });

      const finalTrigger =
        cardTopsRef.current[cards.length - 1] - stackPositionPx - itemStackDistance * (cards.length - 1);
      const complete = scrollTop >= finalTrigger;
      if (complete && !completeRef.current) onStackComplete?.();
      completeRef.current = complete;
    };

    const scheduleUpdate = () => {
      if (updateFrameRef.current !== null) return;
      updateFrameRef.current = window.requestAnimationFrame(() => {
        updateFrameRef.current = null;
        updateTransforms();
      });
    };

    cards.forEach((card, index) => {
      card.style.marginBottom = index === cards.length - 1 ? "0px" : `${itemDistance}px`;
    });

    measure();
    updateTransforms();

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      syncTouch: true,
      syncTouchLerp: 0.08,
      infinite: false,
    });
    lenis.on("scroll", scheduleUpdate);

    const animate = (time: number) => {
      lenis.raf(time);
      lenisFrameRef.current = window.requestAnimationFrame(animate);
    };
    lenisFrameRef.current = window.requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      scheduleUpdate();
    });
    resizeObserver.observe(scroller);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);

    const transforms = transformsRef.current;
    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      if (lenisFrameRef.current !== null) window.cancelAnimationFrame(lenisFrameRef.current);
      if (updateFrameRef.current !== null) window.cancelAnimationFrame(updateFrameRef.current);
      lenisFrameRef.current = null;
      updateFrameRef.current = null;
      cards.forEach((card) => {
        card.style.removeProperty("margin-bottom");
        card.style.removeProperty("transform");
        card.style.removeProperty("filter");
        card.style.removeProperty("z-index");
      });
      transforms.clear();
      cardsRef.current = [];
      activeIndexRef.current = -1;
      completeRef.current = false;
    };
  }, [
    baseScale,
    blurAmount,
    emitActiveIndex,
    enabled,
    itemDistance,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  return (
    <div
      ref={scrollerRef}
      role="list"
      aria-label={ariaLabel}
      className={`${styles.scroller} ${className}`.trim()}
    >
      <div className={styles.inner}>
        {children}
        <div className={`${styles.end} scroll-stack-end`} />
      </div>
    </div>
  );
}
