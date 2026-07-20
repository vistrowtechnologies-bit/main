import { Phone, TrendingUp, Users, CheckCircle2 } from "lucide-react";

/**
 * Connected marketing + lead-management interface mock.
 * Pure CSS/SVG — no external assets or WebGL — so it stays fast and theme-aware.
 */
export function HeroDashboard() {
  const bars = [38, 52, 44, 66, 58, 78, 72, 90];
  return (
    <div className="relative w-full">
      {/* soft accent bloom behind the panel */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/10 blur-[90px]" />

      <div className="glass rounded-xl p-4 shadow-lift sm:p-5">
        {/* header row */}
        <div className="flex items-center justify-between border-b border-line/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-sans text-[13px] font-semibold text-ink">
              Growth Overview
            </span>
          </div>
          <span className="rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-ink">
            Live
          </span>
        </div>

        {/* KPI row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "New leads", value: "1,284", icon: Users },
            { label: "Conversion", value: "6.4%", icon: TrendingUp },
            { label: "AI calls", value: "312", icon: Phone },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-sm border border-line/70 bg-card/70 p-3">
              <kpi.icon className="h-4 w-4 text-accent-strong" strokeWidth={1.75} />
              <p className="mt-2 font-display text-lg font-extrabold text-ink">{kpi.value}</p>
              <p className="font-sans text-[11px] text-muted">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* chart */}
        <div className="mt-3 rounded-sm border border-line/70 bg-card/70 p-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[12px] font-medium text-ink-2">
              Campaign performance
            </span>
            <span className="font-sans text-[11px] font-semibold text-success">+18.2%</span>
          </div>
          <div className="mt-4 flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-[3px] ${
                  i === bars.length - 1 ? "bg-accent" : "bg-accent/25"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* pipeline / follow-up row */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-sm border border-line/70 bg-card/70 p-3">
            <p className="font-sans text-[11px] text-muted">Pipeline</p>
            <div className="mt-2 space-y-2">
              {[
                { stage: "Qualified", w: "82%" },
                { stage: "Proposal", w: "54%" },
                { stage: "Won", w: "36%" },
              ].map((row) => (
                <div key={row.stage}>
                  <div className="flex justify-between">
                    <span className="font-sans text-[11px] text-ink-2">{row.stage}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-line/70">
                    <div className="h-full rounded-full bg-accent-strong" style={{ width: row.w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-line/70 bg-card/70 p-3">
            <p className="font-sans text-[11px] text-muted">Follow-up status</p>
            <ul className="mt-2 space-y-2">
              {["Auto SMS sent", "Call booked", "Email nurture"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" strokeWidth={2} />
                  <span className="font-sans text-[11px] text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* floating conversion chip */}
      <div className="absolute -bottom-5 -left-3 hidden animate-float items-center gap-3 rounded-lg glass p-3 shadow-soft sm:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent">
          <TrendingUp className="h-5 w-5 text-accent-ink" strokeWidth={2} />
        </div>
        <div>
          <p className="font-sans text-[11px] text-muted">Conversion lift</p>
          <p className="font-display text-base font-extrabold text-ink">+42% avg.</p>
        </div>
      </div>
    </div>
  );
}
