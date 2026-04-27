import { Nav } from "@/components/loomwire/Nav";
import { WeaveCanvas } from "@/components/loomwire/WeaveCanvas";
import { Ticker } from "@/components/loomwire/Ticker";
import { ProtocolMatrix } from "@/components/loomwire/ProtocolMatrix";
import { PayloadFusion } from "@/components/loomwire/PayloadFusion";
import { StatGrid } from "@/components/loomwire/StatGrid";
import { Footer } from "@/components/loomwire/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-bg grid-bg-fade absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-16 pb-12 md:grid-cols-[1.05fr_1fr] md:pt-24 md:pb-20">
          <div className="animate-rise">
            <div className="flex items-center gap-2">
              <span className="chip chip-live">
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-primary">
                  <span className="dot-pulse" />
                </span>
                fusion mesh · online
              </span>
              <span className="chip">v1.4 · open weave</span>
            </div>

            <h1 className="mt-6 font-mono text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] md:text-7xl">
              Weave every
              <br />
              IoT protocol
              <br />
              into <span className="text-weave">one stream.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Loomwire is a protocol fusion engine that merges MQTT, CoAP, Zigbee, Modbus,
              LoRaWAN, OPC-UA, BLE and Matter into a single, normalized telemetry fabric —
              with sub-20ms p99 and zero glue code.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#cta"
                className="group relative inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                Start weaving
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#loom"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface-2 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                See the loom
              </a>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["24", "adapters"],
                ["1.4M", "msg/sec"],
                ["18ms", "p99"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 font-mono text-2xl font-bold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero loom panel */}
          <div className="relative animate-rise" style={{ animationDelay: "0.15s" }}>
            <div className="panel-glow scanline relative overflow-hidden rounded-sm">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary" />
                  loom · live weave
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span>region eu-2</span>
                  <span className="text-primary">●</span>
                </div>
              </div>
              <WeaveCanvas />
              <div className="grid grid-cols-3 gap-px border-t border-border bg-border">
                {[
                  ["in",  "1,204k/s"],
                  ["out", "1,201k/s"],
                  ["drop", "0.002%"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-surface px-4 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {k}
                    </div>
                    <div className="mt-1 font-mono text-sm font-bold text-foreground">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating coordinate */}
            <div className="absolute -left-3 -top-3 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:block">
              52.37°N · 4.89°E
            </div>
          </div>
        </div>

        <Ticker />
      </section>

      {/* PROTOCOLS */}
      <section id="protocols" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="chip">/02 — adapters</span>
            <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight md:text-5xl">
              Every protocol, <span className="text-weave">spoken natively.</span>
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Each adapter is a first-class citizen — not a translator on top of a translator.
            Drop one in and the fusion engine reshapes the fabric automatically.
          </p>
        </div>
        <ProtocolMatrix />
      </section>

      {/* FUSION */}
      <section id="loom" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 md:grid-cols-[2fr_1fr]">
          <div>
            <span className="chip">/03 — fusion engine</span>
            <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight md:text-5xl">
              From <span className="text-weave">noise</span> to a single,
              <br />
              normalized signal.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            The weaver applies a deterministic schema, deduplicates across overlapping radios,
            and emits one canonical event per physical phenomenon — regardless of how many
            devices reported it or what protocol they used.
          </p>
        </div>
        <PayloadFusion />
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <StatGrid />
      </section>

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden border-y border-border">
        <div className="grid-bg grid-bg-fade absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <span className="chip chip-live">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            free during beta
          </span>
          <h2 className="mt-6 font-mono text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Stop translating. <br />
            <span className="text-weave">Start weaving.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Connect a gateway in under three minutes. Receive a unified telemetry stream
            you can query, route, and persist anywhere.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="rounded-sm bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Open the loom →
            </a>
            <a
              href="#"
              className="rounded-sm border border-border bg-surface-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Talk to engineering
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
