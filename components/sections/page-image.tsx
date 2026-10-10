import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function PageImage({
  src,
  alt,
  position = "top",
}: {
  src: string;
  alt: string;
  position?: "top" | "bottom";
}) {
  return (
    <section className={position === "top" ? "pt-section" : "pb-section"}>
      <div className="container-edge">
        <Reveal>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line sm:aspect-[16/9]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1280px) 1240px, 100vw"
              className="object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
