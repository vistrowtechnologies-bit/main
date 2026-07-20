const platforms = ["Google Ads", "Meta", "HubSpot", "WhatsApp", "Twilio", "Pipedrive"];

export function TrustStrip() {
  return (
    <section className="overflow-hidden border-y border-line bg-surface">
      <div className="container-edge py-12">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Platforms we connect across the growth system
        </p>
        <div className="logo-marquee mt-8 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="logo-marquee-track">
            {[...platforms, ...platforms].map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= platforms.length}
                className="shrink-0 px-8 font-display text-xl font-bold tracking-tight text-muted/70 grayscale transition-colors hover:text-ink sm:px-12"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
