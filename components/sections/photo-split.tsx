import { CheckCircle2 } from "lucide-react";
import { NotchPhoto } from "@/components/sections/notch-photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageImage } from "@/lib/page-images";

// Heading across the top, then a contained photo beside a short body and points
// (side by side from 1280px, stacked below). Same layout as the service and location pages.
export function PhotoSplit({
  eyebrow,
  title,
  body,
  points,
  image,
  surface = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  image: PageImage;
  surface?: boolean;
}) {
  return (
    <section className={`py-section ${surface ? "bg-surface" : ""}`}>
      <div className="container-edge">
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-10 max-w-3xl" />
        <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-14">
          <Reveal className="max-w-2xl xl:max-w-none">
            <NotchPhoto src={image.src} alt={image.alt} />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl font-sans text-lg leading-relaxed text-muted">{body}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-lg border border-line bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={2} />
                  <span className="font-sans text-[15px] leading-relaxed text-ink-2">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
