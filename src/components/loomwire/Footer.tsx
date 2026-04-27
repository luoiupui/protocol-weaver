export const Footer = () => (
  <footer className="border-t border-border bg-surface/40">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-12 md:grid-cols-4">
      <div className="col-span-2">
        <div className="font-mono text-sm font-bold tracking-[0.18em]">
          LOOM<span className="text-primary">·</span>WIRE
        </div>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          The IoT protocol fusion weaver. One coherent telemetry fabric for every device,
          every gateway, every standard.
        </p>
      </div>
      {[
        { h: "Product", l: ["Protocols", "Fusion engine", "Edge agent", "Pricing"] },
        { h: "Resources", l: ["Docs", "Changelog", "Status", "Security"] },
      ].map((c) => (
        <div key={c.h}>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {c.h}
          </div>
          <ul className="mt-3 space-y-2">
            {c.l.map((i) => (
              <li key={i}>
                <a href="#" className="text-sm text-foreground/80 transition-colors hover:text-primary">
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>© 2026 Loomwire Systems</span>
        <span>built on the open weave protocol</span>
      </div>
    </div>
  </footer>
);
