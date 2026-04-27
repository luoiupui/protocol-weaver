export const Nav = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5">
          <div className="relative grid h-7 w-7 place-items-center rounded-sm border border-primary/40 bg-surface-2">
            <div className="absolute inset-1 rounded-[2px] bg-gradient-to-br from-primary to-primary-glow opacity-90" />
            <div className="relative h-2 w-2 rounded-full bg-background" />
          </div>
          <div className="font-mono text-sm font-bold tracking-[0.18em]">
            LOOM<span className="text-primary">·</span>WIRE
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {["Protocols", "Loom", "Pricing", "Docs"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="chip chip-live hidden sm:inline-flex">
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-primary">
              <span className="dot-pulse" />
            </span>
            mesh: 1,402 nodes
          </span>
          <a
            href="#cta"
            className="rounded-sm border border-primary/50 bg-primary/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Open loom →
          </a>
        </div>
      </div>
    </header>
  );
};
