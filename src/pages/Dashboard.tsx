import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play, BarChart3, Shield, Layers, FileText, Activity } from 'lucide-react';
import { runSimulation, type SimulationResults } from '@/lib/simulation';
import { InfoTooltip } from '@/components/InfoTooltip';
import { DataPipelineFlow } from '@/components/DataPipelineFlow';
import { ConfusionMatrix } from '@/components/ConfusionMatrix';
import { ClassificationReport } from '@/components/ClassificationReport';
import { LatencyChart } from '@/components/LatencyChart';
import { ThroughputChart } from '@/components/ThroughputChart';
import { ResourceChart } from '@/components/ResourceChart';
import { ComparisonTable } from '@/components/ComparisonTable';
import { TechnicalReport } from '@/components/TechnicalReport';
import { Nav } from '@/components/loomwire/Nav';

const Dashboard = () => {
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    document.title = 'Loomwire Dashboard — Multi-Protocol IoT Fusion Simulator';
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
        return m;
      })();
    meta.setAttribute(
      'content',
      'Live simulation of Modbus RTU, MQTT, OPC UA & CoAP fusion across the device-edge-fog-cloud loom.',
    );
  }, []);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => {
      const res = runSimulation(1000, 3);
      setResults(res);
      setRunning(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Dashboard subheader */}
      <section className="border-b border-border/60 bg-surface/40 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              /dashboard · simulation
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Smart Factory Multi-Protocol Fusion
            </h1>
            <p className="text-sm text-muted-foreground">
              智能工厂多协议融合仿真平台 — Modbus RTU · MQTT · OPC UA · CoAP across device → edge → fog → cloud.
            </p>
          </div>
          <Button onClick={handleRun} disabled={running} size="sm" className="font-mono uppercase tracking-[0.18em]">
            <Play className="mr-1 h-4 w-4" />
            {running ? 'Running…' : results ? 'Re-run' : 'Run simulation'}
          </Button>
        </div>
      </section>

      <main className="mx-auto max-w-7xl p-6">
        {!results ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Activity className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Press “Run simulation” to weave the loom
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Simulates 3 production lines × 1,000 ticks of Modbus RTU (PLC), MQTT (env. sensors),
              OPC UA (MES), and CoAP (low-power energy) traffic, then fuses them via the EdgeFusionEngine.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full max-w-2xl grid-cols-5">
              <TabsTrigger value="overview" className="text-xs">
                <BarChart3 className="mr-1 h-3 w-3" />Overview
              </TabsTrigger>
              <TabsTrigger value="recognition" className="text-xs">
                <Shield className="mr-1 h-3 w-3" />Recognition
              </TabsTrigger>
              <TabsTrigger value="latency" className="text-xs">
                <Activity className="mr-1 h-3 w-3" />Latency
              </TabsTrigger>
              <TabsTrigger value="comparison" className="text-xs">
                <Layers className="mr-1 h-3 w-3" />Architecture
              </TabsTrigger>
              <TabsTrigger value="report" className="text-xs">
                <FileText className="mr-1 h-3 w-3" />Report
              </TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Key performance indicators (KPIs) and the data-processing pipeline. Hover the ⓘ on each card for definitions and formulas.
              </p>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <KPICard
                  label="Total messages"
                  value={results.totalMessages.toLocaleString()}
                  unit="UIR records"
                  tooltip="All UIR (Unified Intermediate Representation) records emitted by the protocol adapters."
                  formula={`= ${results.protocolBreakdown.map((p) => p.count).join(' + ')}`}
                  color="text-industrial-blue"
                />
                <KPICard
                  label="Fused records"
                  value={results.fusedRecords.toLocaleString()}
                  unit={`(fusion ratio ${(results.fusionRatio * 100).toFixed(1)}%)`}
                  tooltip="Records emitted by the EdgeFusionEngine after a 5-tick time window. Multiple readings per entity collapse into one."
                  formula={`ratio = ${results.fusedRecords} / ${results.totalMessages} = ${(results.fusionRatio * 100).toFixed(1)}%`}
                  color="text-industrial-amber"
                  subtext={`Conflicts resolved: ${results.conflictsResolved} (CV>15%)`}
                />
                <KPICard
                  label="Recognition accuracy"
                  value={`${(results.recognitionAccuracy * 100).toFixed(1)}%`}
                  unit=""
                  tooltip="Overall classification accuracy from the confusion matrix. Packets are fingerprinted via CRC16, header signatures, magic bytes, version nibbles."
                  formula="= Σ(diagonal) / Σ(matrix)"
                  color="text-industrial-green"
                />
                <KPICard
                  label="P95 latency"
                  value={results.latencyStats.reduce((b, s) => Math.max(b, s.p95), 0).toFixed(3)}
                  unit="ms (sim)"
                  tooltip="Worst-case P95 across protocols. Target < 50 ms for industrial real-time SLAs."
                  formula="P95 = percentile(latency, 95)"
                  color="text-industrial-red"
                />
              </div>

              <DataPipelineFlow results={results} />

              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">Protocol breakdown</h3>
                  <InfoTooltip content="UIR record counts and share per protocol. Modbus emits every tick, MQTT every 10, OPC UA every 50, CoAP every 15." />
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {results.protocolBreakdown.map((p) => (
                    <div key={p.protocol} className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">{p.protocol}</p>
                      <p className="font-mono text-xl font-bold text-foreground">{p.count.toLocaleString()}</p>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${Math.max(p.percentage, 2)}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{p.percentage.toFixed(1)}% share</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Recognition */}
            <TabsContent value="recognition" className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Multi-feature fingerprint detector — CRC16 (Modbus), header pattern (MQTT 0x30–0x3F),
                magic bytes (OPC UA “OPN”), version nibble (CoAP 0x4x).
              </p>
              <ConfusionMatrix data={results.confusionMatrix} />
              <ClassificationReport metrics={results.classificationMetrics} />
            </TabsContent>

            {/* Latency */}
            <TabsContent value="latency" className="space-y-4">
              <p className="text-xs text-muted-foreground">
                End-to-end processing latency, throughput and resource trends. Percentiles, not averages —
                the industrial real-time standard.
              </p>
              <LatencyChart stats={results.latencyStats} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ThroughputChart data={results.throughputTimeline} />
                <ResourceChart data={results.resourceTimeline} />
              </div>
            </TabsContent>

            {/* Architecture comparison */}
            <TabsContent value="comparison" className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Quantitative comparison: traditional centralized stack vs. the proposed
                device–edge–fog–cloud layered loom.
              </p>
              <ComparisonTable />
            </TabsContent>

            {/* Report */}
            <TabsContent value="report" className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Hardware bill, end-to-end test results, architecture diagrams, UIR schema, and
                simulation parameters — ready for thesis appendix or technical review.
              </p>
              <TechnicalReport results={results} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

function KPICard({
  label, value, unit, tooltip, formula, color, subtext,
}: {
  label: string; value: string; unit: string; tooltip: string;
  formula: string; color: string; subtext?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <InfoTooltip content={tooltip} formula={formula} />
      </div>
      <p className={`font-mono text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{unit}</p>
      {subtext && <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>}
    </div>
  );
}

export default Dashboard;
