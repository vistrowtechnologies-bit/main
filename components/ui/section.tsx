import type { ReactNode } from "react";

/**
 * The one section wrapper: same vertical rhythm everywhere, alternating plain and surface tones
 * so there are never empty dark bands between blocks.
 */
export function Section({
  tone = "plain",
  id,
  children,
  className = "",
  labelledBy,
}: {
  tone?: "plain" | "surface";
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-block ${tone === "surface" ? "border-y border-line bg-surface" : ""} ${className}`}
    >
      <div className="container-edge">{children}</div>
    </section>
  );
}

/** The one card style: a single radius, border and padding for every card on the site. */
export function Card({
  children,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`h-full rounded-lg border p-6 sm:p-8 ${
        accent ? "border-accent/40 bg-accent/10" : "border-line bg-card"
      } ${className}`}
    >
      {children}
    </div>
  );
}
