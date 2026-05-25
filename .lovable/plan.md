# Build the Dashboard from `luoiupui/iot-protocol-weaver` (main)

## What's there vs. what's missing

The public fork ships a **single-page simulation dashboard** built around a `runSimulation()` engine and 5 tabs (Overview, Recognition, Latency, Comparison, Report). Its chart components (`LatencyChart`, `ThroughputChart`, `ResourceChart`, `ConfusionMatrix`, `ClassificationReport`, `ComparisonTable`, `DataPipelineFlow`, `TechnicalReport`) are already in this project — but they're **orphaned and broken** because:

- `src/lib/simulation.ts` doesn't exist here
- `src/components/InfoTooltip.tsx` doesn't exist here
- `src/components/NavLink.tsx` doesn't exist here
- No page composes them, no KPI cards, no tab shell

The Loomwire landing page on `/` will be left untouched.

## What I'll build

1. **Port the simulation engine** — copy `src/lib/simulation.ts` verbatim from the fork (pure TS, no UI deps, generates UIR records, fused records, confusion matrix, latency/throughput/resource series).
2. **Port two small helpers** — `src/components/InfoTooltip.tsx` and `src/components/NavLink.tsx` from the fork (used by the existing chart components).
3. **Verify the 8 chart components compile** against the ported `simulation.ts` types; patch any drift so imports resolve cleanly.
4. **Create `src/pages/Dashboard.tsx`** — the tabbed shell from the fork (Overview / Recognition / Latency / Comparison / Report), including the inline `KPICard` subcomponent and the "Run simulation" CTA. Bilingual labels (CN + EN) preserved as in source.
5. **Re-skin to Loomwire** — replace the fork's plain `bg-card / border-border` chrome with Loomwire's existing semantic tokens (`weave-canvas` surface, accent gradients, mono display font for KPI values). No raw hex colors; everything via `index.css` tokens already defined.
6. **Wire the route** — add `<Route path="/dashboard" element={<Dashboard/>} />` in `src/App.tsx` and a "Dashboard" link in `src/components/loomwire/Nav.tsx` so users can reach it from the landing page.
7. **SEO** — `<title>` + meta description + single H1 on the dashboard page.

## Out of scope

- No backend / Lovable Cloud — the fork's simulation is fully client-side and deterministic; I'll keep it that way.
- No edits to the Loomwire landing components beyond adding a Nav link.
- No refresh of `old_gui_backend_file.md` (say the word if you want it re-snapshotted after).
- I will **not** touch the fork or any `new` branch — purely a one-way port of files from the fork's `main` into this project.

## Technical details

- Files added: `src/lib/simulation.ts`, `src/components/InfoTooltip.tsx`, `src/components/NavLink.tsx`, `src/pages/Dashboard.tsx`.
- Files edited: `src/App.tsx` (route), `src/components/loomwire/Nav.tsx` (link).
- The 8 existing chart components stay as-is unless type mismatches surface during verification.
- Tabs/Card/Button shadcn primitives are already installed — no new deps.
- Heading text on the dashboard will read "Smart Factory Multi-Protocol Fusion" (EN) above "智能工厂多协议融合仿真平台" (CN), matching the fork.

Approve and I'll port the files and wire the route.
