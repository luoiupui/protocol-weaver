import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ResourcePoint } from '@/lib/simulation';
import { InfoTooltip } from './InfoTooltip';

interface ResourceChartProps {
  data: ResourcePoint[];
}

export function ResourceChart({ data }: ResourceChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">资源占用趋势</h3>
        <InfoTooltip
          content="模拟ARM Cortex-A72级别边缘设备（如Raspberry Pi 4）的CPU和内存占用。随着仿真推进，UIR缓存增长导致内存上升。实际部署中需配合滑动窗口清理策略控制内存。"
        />
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        边缘设备约束：CPU ≤ 4核 1.5GHz，RAM ≤ 4GB。当CPU &gt; 70%或RAM &gt; 80%时需触发降级策略（降低融合窗口频率或丢弃低优先级OPC UA数据）。
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="tick" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis yAxisId="cpu" tick={{ fontSize: 11 }} stroke="hsl(var(--chart-1))" domain={[0, 100]} label={{ value: 'CPU %', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
          <YAxis yAxisId="mem" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(var(--chart-2))" label={{ value: 'MB', angle: 90, position: 'insideRight', style: { fontSize: 10 } }} />
          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line yAxisId="cpu" type="monotone" dataKey="cpuPercent" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} name="CPU %" />
          <Line yAxisId="mem" type="monotone" dataKey="memoryMB" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="Memory (MB)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
