const STATS = [
  { k: "p99 latency", v: "18", unit: "ms" },
  { k: "throughput",  v: "2.4", unit: "M msg/s" },
  { k: "adapters",    v: "24", unit: "live" },
  { k: "uptime",      v: "99.998", unit: "%" },
];

export const StatGrid = () => (
  <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-4">
    {STATS.map((s) => (
      <div key={s.k} className="relative bg-surface p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {s.k}
        </div>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-mono text-3xl font-bold text-foreground">{s.v}</span>
          <span className="font-mono text-[11px] text-primary">{s.unit}</span>
        </div>
      </div>
    ))}
  </div>
);
