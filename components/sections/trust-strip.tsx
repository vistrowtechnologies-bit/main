// Placeholder wordmarks — replace with real, verified client/platform logos.
const logos = ["Northwind", "Aperture", "Meridian", "Quanta", "Voxel", "Lumen"];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-edge py-12">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Powering growth for teams that take pipeline seriously
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
          {logos.map((name) => (
            <span
              key={name}
              className="font-display text-xl font-bold tracking-tight text-muted/70 grayscale transition-colors hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
