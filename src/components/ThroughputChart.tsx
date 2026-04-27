import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ThroughputPoint } from '@/lib/simulation';
import { InfoTooltip } from './InfoTooltip';

interface ThroughputChartProps {
  data: ThroughputPoint[];
}

export function ThroughputChart({ data }: ThroughputChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">吞吐量时间线 (消息/tick)</h3>
        <InfoTooltip
          content="每个采样点记录该tick内各协议生成的UIR记录数。Modbus每tick恒定产生(3线×4PLC×3寄存器=36条)，MQTT、CoAP和OPC UA周期性出现尖峰。"
          formula="Total = Modbus + MQTT + OPC_UA + CoAP (per tick)"
        />
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Modbus RTU为主要数据源（占比约95%），提供持续高频数据流；
        MQTT每10个tick触发（环境监测），CoAP每15个tick触发（能耗监测），OPC UA每50个tick触发（MES产线指标）。
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="tick" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="modbus" stackId="1" fill="hsl(var(--chart-1))" stroke="hsl(var(--chart-1))" fillOpacity={0.6} name="Modbus RTU" />
          <Area type="monotone" dataKey="mqtt" stackId="1" fill="hsl(var(--chart-2))" stroke="hsl(var(--chart-2))" fillOpacity={0.6} name="MQTT" />
          <Area type="monotone" dataKey="opcua" stackId="1" fill="hsl(var(--chart-3))" stroke="hsl(var(--chart-3))" fillOpacity={0.6} name="OPC UA" />
          <Area type="monotone" dataKey="coap" stackId="1" fill="hsl(var(--chart-4))" stroke="hsl(var(--chart-4))" fillOpacity={0.6} name="CoAP" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
