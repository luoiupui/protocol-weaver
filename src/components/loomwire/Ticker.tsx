const ROWS = [
  "MQTT  · /sensors/temp/3a → 22.4°C",
  "ZIGBEE · 0x4f7a · battery=87%",
  "COAP  · /env/co2 → 412ppm",
  "MODBUS · slave=12 · holding[3]=1",
  "LORA  · gw-eu-2 · rssi=-104",
  "MQTT  · /pumps/01/state → ON",
  "ZIGBEE · 0xa1c0 · motion=true",
  "COAP  · /valve/04 → closed",
  "MODBUS · slave=8 · input[12]=440",
  "LORA  · dev=eui-9b · vbat=3.71",
];

export const Ticker = () => {
  const doubled = [...ROWS, ...ROWS];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/60 py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-tick gap-10 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {doubled.map((r, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            {r}
          </span>
        ))}
      </div>
    </div>
  );
};
