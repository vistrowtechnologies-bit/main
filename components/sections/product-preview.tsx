import { Sparkles } from "lucide-react";

/** Generic glass product-interface mock used in product page heroes. */
export function ProductPreview({
  name,
  tagline,
  stats = [
    { value: "24/7", label: "Active" },
    { value: "128", label: "Queue" },
    { value: "100%", label: "Synced" },
  ],
  rows = [
    { label: "Connected to CRM", value: "Done" },
    { label: "Calendar synced", value: "Done" },
    { label: "Follow-up active", value: "Done" },
  ],
}: {
  name: string;
  tagline: string;
  stats?: { value: string; label: string }[];
  rows?: { label: string; value: string }[];
}) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/10 blur-[90px]" />
      <div className="glass rounded-xl p-5 shadow-lift">
        <div className="flex items-center justify-between border-b border-line/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-sans text-[13px] font-semibold text-ink">{name}</span>
          </div>
          <span className="rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-ink">
            {tagline}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="rounded-sm border border-line/70 bg-card/70 p-3">
              <p className="font-display text-lg font-extrabold text-ink">{stat.value}</p>
              <p className="font-sans text-[11px] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-sm border border-line/70 bg-card/70 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-strong" strokeWidth={2} />
            <span className="font-sans text-[12px] font-medium text-ink-2">Live activity</span>
          </div>
          <div className="mt-3 space-y-2">
            {[80, 60, 45].map((w, i) => (
              <div key={i} className="h-2 w-full overflow-hidden rounded-full bg-line/70">
                <div className="h-full rounded-full bg-accent-strong/70" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {rows.slice(0, 3).map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-sm border border-line/70 bg-card/70 px-4 py-2.5"
            >
              <span className="font-sans text-[13px] text-muted">{row.label}</span>
              <span className="font-sans text-[12px] font-semibold text-success">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
