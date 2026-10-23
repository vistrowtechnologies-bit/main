"use client";

import Image from "next/image";
import { useState } from "react";

export type TourScreen = { src: string; alt: string; title: string; body: string; width: number; height: number; bare?: boolean };

// Real product screens as tabs. Every screen stays in the HTML (inactive ones are hidden with CSS)
// so all images and captions remain indexable.
export function ProductTour({ screens, phone }: { screens: TourScreen[]; phone?: TourScreen }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div role="tablist" aria-label="Product screens" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {screens.map((screen, index) => (
          <button
            key={screen.src}
            type="button"
            role="tab"
            id={`tour-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`tour-panel-${index}`}
            onClick={() => setActive(index)}
            className={`shrink-0 rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-colors ${
              active === index ? "border-accent bg-accent text-accent-ink" : "border-line bg-card text-ink-2 hover:border-ink/30"
            }`}
          >
            {screen.title}
          </button>
        ))}
      </div>

      <div className={`mt-6 grid items-start gap-gutter ${phone ? "lg:grid-cols-[minmax(0,1fr)_240px]" : ""}`}>
        <div>
          {screens.map((screen, index) => (
            <figure
              key={screen.src}
              id={`tour-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`tour-tab-${index}`}
              className={active === index ? "block" : "hidden"}
            >
              {screen.bare ? (
                <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(min-width: 1024px) 960px, 100vw" className="mx-auto h-auto w-full max-w-4xl" />
              ) : (
                <BrowserFrame>
                  <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(min-width: 1024px) 960px, 100vw" className="h-auto w-full" />
                </BrowserFrame>
              )}
              <figcaption className="mt-4 max-w-2xl">
                <p className="font-display text-lg font-bold text-ink">{screen.title}</p>
                <p className="mt-1 font-sans text-[15px] leading-relaxed text-muted">{screen.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {phone && (
          <figure className="mx-auto hidden w-full max-w-[240px] lg:block">
            <div className="overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink shadow-lift">
              <Image src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} sizes="240px" className="h-auto w-full rounded-[22px]" />
            </div>
            <figcaption className="mt-4">
              <p className="font-display text-base font-bold text-ink">{phone.title}</p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-muted">{phone.body}</p>
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

export function BrowserFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-card shadow-lift ${className}`}>
      <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      {children}
    </div>
  );
}
