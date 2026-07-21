"use client";

import { useEffect, useRef, useState } from "react";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number>();

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const update = () => {
      const { top, height } = target.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = height - viewport;
      const scrolled = total > 0 ? (viewport - top) / total : 0;
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };

    const onScroll = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [targetId]);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden>
      <div
        className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
