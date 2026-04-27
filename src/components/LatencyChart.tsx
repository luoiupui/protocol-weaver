import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { LatencyStats } from '@/lib/simulation';
import { InfoTooltip } from './InfoTooltip';

interface LatencyChartProps {
  stats: LatencyStats[];
}

export function LatencyChart({ stats }: LatencyChartProps) {
  const chartData = stats.map(s => ({
    protocol: s.protocol,
    P50: Number(s.p50.toFixed(3)),
    P95: Number(s.p95.toFixed(3)),
    P99: Number(s.p99.toFixed(3)),
    Mean: Number(s.mean.toFixed(3)),
  }));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">延迟分布 (ms)</h3>
        <InfoTooltip
          content="延迟指从收到原始数据包到生成UIR记录的端到端处理时间。使用百分位数（而非平均值）评估是工业系统的标准做法，因为尾部延迟决定了系统的实时性保障。"
          formula="P95 = 95%的请求在此时间内完成"
        />
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        <strong>P50(中位数)</strong>：一半消息在此时间内处理完成，反映典型性能；
        <strong>P95</strong>：95%消息的处理时间上界，工业系统关键指标（目标 &lt; 50ms）；
        <strong>P99</strong>：极端情况下的延迟，检测系统稳定性。
        注：当前为浏览器仿真延迟，实际ARM边缘设备上延迟约为此值的10-50倍。
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="protocol" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" label={{ value: 'ms', position: 'insideLeft', offset: -5, style: { fontSize: 11 } }} />
          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="P50" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
          <Bar dataKey="P95" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
          <Bar dataKey="P99" fill="hsl(var(--chart-4))" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
        {stats.map(s => (
          <div key={s.protocol} className="rounded border border-border p-2">
            <p className="font-medium text-foreground">{s.protocol}</p>
            <p className="text-muted-foreground">样本数: {s.samples.length.toLocaleString()}</p>
            <p className="text-muted-foreground">均值: {s.mean.toFixed(3)}ms</p>
          </div>
        ))}
      </div>
    </div>
  );
}
