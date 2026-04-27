import { useId } from "react";

/**
 * WeaveCanvas — animated SVG showing 5 IoT protocols being woven into one
 * unified telemetry stream. Pure SVG, no external deps.
 */
const PROTOCOLS = [
  { name: "MQTT", note: "pub/sub" },
  { name: "CoAP", note: "udp/rest" },
  { name: "Zigbee", note: "mesh" },
  { name: "Modbus", note: "rtu/tcp" },
  { name: "LoRaWAN", note: "lpwan" },
];

export const WeaveCanvas = () => {
  const gid = useId().replace(/:/g, "");

  return (
    <div className="relative aspect-[5/4] w-full">
      <svg
        viewBox="0 0 600 480"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Five IoT protocols weaving into one fused stream"
      >
        <defs>
          <linearGradient id={`weave-${gid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary-glow))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id={`core-${gid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.95" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${gid}`}>
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Outgoing fused stream core */}
        <circle cx="500" cy="240" r="80" fill={`url(#core-${gid})`} filter={`url(#blur-${gid})`} />
        <circle cx="500" cy="240" r="22" fill="hsl(var(--primary))" opacity="0.9" />
        <circle
          cx="500"
          cy="240"
          r="34"
          fill="none"
          stroke="hsl(var(--primary-glow))"
          strokeWidth="1"
          opacity="0.7"
        />
        <circle
          cx="500"
          cy="240"
          r="48"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          className="animate-weave-rotate"
          style={{ transformOrigin: "500px 240px" }}
        />

        {/* Protocol nodes + woven curves */}
        {PROTOCOLS.map((p, i) => {
          const y = 60 + i * 90;
          const cx1 = 220;
          const cy1 = 240;
          const cx2 = 320;
          const cy2 = y;
          const path = `M 130 ${y} C ${cx1} ${cy1}, ${cx2} ${cy2}, 478 240`;
          const delay = `${i * 0.18}s`;
          return (
            <g key={p.name}>
              {/* base track */}
              <path
                d={path}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.55"
              />
              {/* animated signal */}
              <path
                d={path}
                fill="none"
                stroke={`url(#weave-${gid})`}
                strokeWidth="1.6"
                strokeDasharray="6 14"
                className="animate-flow"
                style={{ animationDelay: delay }}
              />
              {/* protocol node */}
              <g transform={`translate(70 ${y - 14})`}>
                <rect
                  width="78"
                  height="28"
                  rx="2"
                  fill="hsl(var(--surface-2))"
                  stroke="hsl(var(--border))"
                />
                <circle cx="10" cy="14" r="3" fill="hsl(var(--primary))" className="animate-pulse-soft" />
                <text
                  x="20"
                  y="18"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                  fontWeight="700"
                  fill="hsl(var(--foreground))"
                  letterSpacing="0.05em"
                >
                  {p.name}
                </text>
              </g>
            </g>
          );
        })}

        {/* Output label */}
        <g transform="translate(540 232)">
          <text
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="hsl(var(--muted-foreground))"
            letterSpacing="0.2em"
          >
            STREAM
          </text>
          <text
            y="14"
            fontFamily="JetBrains Mono, monospace"
            fontSize="11"
            fontWeight="700"
            fill="hsl(var(--primary-glow))"
            letterSpacing="0.1em"
          >
            unified://
          </text>
        </g>

        {/* Crosshatch corner ticks */}
        {[
          [10, 10],
          [590, 10],
          [10, 470],
          [590, 470],
        ].map(([x, y], i) => (
          <g key={i} stroke="hsl(var(--primary) / 0.5)" strokeWidth="1">
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
          </g>
        ))}
      </svg>
    </div>
  );
};
