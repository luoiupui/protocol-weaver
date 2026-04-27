import { ArrowRight, Cpu, Radio, Layers, Database } from 'lucide-react';
import type { SimulationResults } from '@/lib/simulation';

interface DataPipelineFlowProps {
  results: SimulationResults;
}

export function DataPipelineFlow({ results }: DataPipelineFlowProps) {
  const steps = [
    {
      icon: Radio,
      title: '设备层',
      subtitle: `${results.productionLines}条产线 · 280+数据点`,
      detail: 'Modbus RTU + MQTT + OPC UA + CoAP',
      color: 'text-industrial-blue',
      bgColor: 'bg-industrial-blue/10',
      borderColor: 'border-industrial-blue/30',
    },
    {
      icon: Cpu,
      title: '协议检测 & UIR翻译',
      subtitle: `总处理消息: ${results.totalMessages.toLocaleString()}`,
      detail: `准确率 ${(results.recognitionAccuracy * 100).toFixed(1)}%`,
      color: 'text-industrial-green',
      bgColor: 'bg-industrial-green/10',
      borderColor: 'border-industrial-green/30',
    },
    {
      icon: Layers,
      title: '时间窗融合引擎',
      subtitle: `融合记录: ${results.fusedRecords.toLocaleString()}`,
      detail: `冲突消解: ${results.conflictsResolved} · 融合率 ${(results.fusionRatio * 100).toFixed(1)}%`,
      color: 'text-industrial-amber',
      bgColor: 'bg-industrial-amber/10',
      borderColor: 'border-industrial-amber/30',
    },
    {
      icon: Database,
      title: '输出',
      subtitle: '去重 & 标准化数据',
      detail: `数据压缩比 ${(1 / results.fusionRatio).toFixed(1)}:1`,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">数据处理流水线</h3>
      <p className="text-xs text-muted-foreground mb-4">
        原始工业协议数据经过「指纹检测 → UIR翻译 → 时间窗融合」三阶段处理，实现多源异构数据的统一表示与去冗余。
      </p>
      <div className="flex flex-col md:flex-row items-stretch gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`flex-1 rounded-lg border ${step.borderColor} ${step.bgColor} p-3`}>
              <div className="flex items-center gap-2 mb-1">
                <step.icon className={`h-4 w-4 ${step.color}`} />
                <span className={`text-xs font-semibold ${step.color}`}>{step.title}</span>
              </div>
              <p className="text-xs font-medium text-foreground">{step.subtitle}</p>
              <p className="text-xs text-muted-foreground">{step.detail}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-muted-foreground border-t border-border pt-2">
        <strong>数据关系：</strong>
        总处理消息 = Σ(各协议UIR记录) = {results.protocolBreakdown.map(p => `${p.protocol}: ${p.count.toLocaleString()}`).join(' + ')}；
        融合记录 ⊂ 总处理消息（经时间窗去重后）；
        冲突消解 ⊂ 融合记录（变异系数CV &gt; 15%时触发置信度加权融合）
      </div>
    </div>
  );
}
