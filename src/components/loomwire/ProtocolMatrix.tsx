type Row = {
  name: string;
  transport: string;
  topology: string;
  latency: string;
  status: "live" | "beta";
};

const ROWS: Row[] = [
  { name: "MQTT 5",     transport: "TCP/TLS",  topology: "broker",   latency: "12ms", status: "live" },
  { name: "CoAP",       transport: "UDP",      topology: "rest",     latency: "08ms", status: "live" },
  { name: "Zigbee 3.0", transport: "802.15.4", topology: "mesh",     latency: "44ms", status: "live" },
  { name: "Modbus",     transport: "RTU/TCP",  topology: "polling",  latency: "20ms", status: "live" },
  { name: "LoRaWAN",    transport: "sub-GHz",  topology: "star",     latency: "1.2s", status: "live" },
  { name: "OPC-UA",     transport: "TCP",      topology: "client",   latency: "15ms", status: "beta" },
  { name: "BLE Mesh",   transport: "2.4GHz",   topology: "mesh",     latency: "30ms", status: "beta" },
  { name: "Matter",     transport: "Wi-Fi/Thread", topology: "fabric", latency: "18ms", status: "beta" },
];

export const ProtocolMatrix = () => {
  return (
    <div className="panel relative overflow-hidden rounded-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          adapters / matrix
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          08 of 24 shown
        </span>
      </div>
      <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr_0.6fr] gap-2 border-b border-border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>Protocol</span>
        <span>Transport</span>
        <span>Topology</span>
        <span>p95</span>
        <span className="text-right">State</span>
      </div>
      <ul className="divide-y divide-border/60">
        {ROWS.map((r) => (
          <li
            key={r.name}
            className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr_0.6fr] items-center gap-2 px-5 py-3 font-mono text-xs transition-colors hover:bg-surface-2"
          >
            <span className="font-bold tracking-wide text-foreground">{r.name}</span>
            <span className="text-muted-foreground">{r.transport}</span>
            <span className="text-muted-foreground">{r.topology}</span>
            <span className="text-primary">{r.latency}</span>
            <span className="text-right">
              {r.status === "live" ? (
                <span className="chip chip-live">live</span>
              ) : (
                <span className="chip">beta</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
