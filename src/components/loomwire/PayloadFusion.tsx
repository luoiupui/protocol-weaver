export const PayloadFusion = () => {
  return (
    <div className="panel relative overflow-hidden rounded-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary" />
          fusion · payload normalizer
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">v1.4.2</span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-[1fr_auto_1fr]">
        {/* Inputs */}
        <div className="bg-surface p-5">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            inputs · 3 raw frames
          </div>
          <pre className="overflow-x-auto rounded-sm border border-border bg-background/60 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
{`MQTT   /farm/north/soil/8a
       { "t": 1714, "v": 0.42, "u": "vwc" }

CoAP   coap://gw/env/co2
       2.05 → 412 ppm

Modbus slave=12 holding[3..6]
       [22, 64, 1, 0]`}
          </pre>
        </div>

        {/* Arrow */}
        <div className="hidden items-center justify-center bg-surface px-4 md:flex">
          <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            <span>weave</span>
            <span className="text-2xl leading-none">→</span>
            <span>fuse</span>
          </div>
        </div>

        {/* Output */}
        <div className="bg-surface p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              fused stream
            </span>
            <span className="chip chip-live">unified://</span>
          </div>
          <pre className="overflow-x-auto rounded-sm border border-primary/30 bg-primary/5 p-3 font-mono text-[11px] leading-relaxed text-foreground">
{`{
  "site": "farm.north",
  "ts":   "2025-04-27T14:02:11Z",
  "metrics": {
    "soil.vwc":   0.42,
    "air.co2":    412,
    "pump.state": "on",
    "tank.level": 64
  },
  "_sources": ["mqtt","coap","modbus"]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
