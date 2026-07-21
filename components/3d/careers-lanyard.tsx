"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Move3D } from "lucide-react";
import { useReducedMotion } from "framer-motion";

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
};

const Lanyard = dynamic<LanyardProps>(() => import("@/components/3d/lanyard"), {
  ssr: false,
  loading: () => <div className="h-[450px] w-full animate-pulse rounded-2xl bg-accent/5 sm:h-[540px]" />,
});

export function CareersLanyard() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative flex h-[450px] items-center justify-center sm:h-[540px]">
        <div className="absolute h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative w-56 rotate-2 rounded-xl border border-accent/40 bg-inverse p-5 shadow-lift">
          <Image
            src="/logo-dark.png"
            alt="Vistrow"
            width={470}
            height={120}
            className="h-auto w-full"
          />
          <div className="mt-7 border-t border-white/15 pt-5">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              Careers
            </p>
            <p className="mt-2 font-display text-xl font-bold text-white">Build what grows.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative -my-8 min-h-[450px] sm:min-h-[540px] lg:-my-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] bottom-[10%] h-48 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line/70 bg-card/75 px-3 py-1.5 font-sans text-[11px] font-semibold text-muted shadow-soft backdrop-blur-md">
        <Move3D className="h-3.5 w-3.5 text-accent-strong" />
        Drag the pass
      </div>
      <Lanyard
        position={[0, 0, 23]}
        gravity={[0, -40, 0]}
        fov={20}
        frontImage="/logo-dark.png"
        backImage="/logo-light.png"
        imageFit="contain"
        lanyardImage="/logo-dark.png"
        lanyardWidth={0.82}
      />
    </div>
  );
}
