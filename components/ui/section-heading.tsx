import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 font-display text-h2 text-ink">{title}</h2>
      {description && (
        <p className="mt-4 font-sans text-lg leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  );
}
