import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { BrowserFrame } from "@/components/sections/product-tour";
import type { ShowcaseShot } from "@/lib/content-types";

// Real screens or real client work for a service. The first shot leads; the rest sit in a row beneath it.
export function ServiceShowcase({ eyebrow, title, body, shots }: { eyebrow: string; title: string; body: string; shots: ShowcaseShot[] }) {
  const [lead, ...rest] = shots;
  const phoneBeside = rest.length === 1 && rest[0].height > rest[0].width;

  return (
    <section className="border-y border-line bg-surface py-section">
      <div className="container-edge">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-h2 text-ink">{title}</h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-muted">{body}</p>
        </div>
        <div className={`mt-10 grid items-start gap-gutter ${phoneBeside ? "lg:grid-cols-[minmax(0,1fr)_240px]" : ""}`}>
          <Reveal>
            <Shot shot={lead} sizes="(min-width: 1024px) 1000px, 100vw" />
          </Reveal>
          {phoneBeside && (
            <Reveal delay={0.06} className="mx-auto w-full max-w-[240px]">
              <Shot shot={rest[0]} sizes="240px" />
            </Reveal>
          )}
        </div>
        {!phoneBeside && rest.length > 0 && (
          <div className={`mt-gutter grid gap-gutter ${rest.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {rest.map((shot, index) => (
              <Reveal key={shot.src} delay={index * 0.06}>
                <Shot shot={shot} sizes="(min-width: 768px) 420px, 100vw" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Shot({ shot, sizes }: { shot: ShowcaseShot; sizes: string }) {
  const phone = shot.height > shot.width;
  const image = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      className={`h-auto w-full ${phone ? "rounded-[17px]" : ""}`}
    />
  );
  const framed =
    shot.frame === "none" ? (
      image
    ) : shot.frame === "browser" ? (
      <BrowserFrame>{image}</BrowserFrame>
    ) : phone ? (
      <div className="overflow-hidden rounded-[22px] border-[5px] border-ink bg-ink shadow-lift">{image}</div>
    ) : (
      <div className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">{image}</div>
    );

  return (
    <figure>
      {framed}
      <figcaption className="mt-3 flex items-start justify-between gap-3 font-sans text-sm leading-relaxed text-muted">
        <span>{shot.caption}</span>
        {shot.href && (
          <a href={shot.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 font-semibold text-ink hover:text-accent-strong">
            Visit site <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

// Product-led hero: one real screen in a clean frame, with a soft accent glow behind it.
export function HeroScreen({ shot }: { shot: ShowcaseShot }) {
  const phone = shot.height > shot.width;
  const image = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={phone ? "280px" : "(min-width: 1024px) 640px, 100vw"}
      priority
      className={`h-auto w-full ${phone ? "rounded-[22px]" : ""}`}
    />
  );
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-accent/15 blur-3xl" />
      {shot.frame === "none" ? (
        <div className="lg:-mr-20 xl:-mr-32">{image}</div>
      ) : shot.frame === "browser" ? (
        // App screens run large and off the right edge, the way product sites show their UI.
        <BrowserFrame className="lg:-mr-40 xl:-mr-64">{image}</BrowserFrame>
      ) : phone ? (
        <div className="mx-auto max-w-[280px] overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink shadow-lift">{image}</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-lift">{image}</div>
      )}
    </div>
  );
}
