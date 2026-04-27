import type { ClassificationMetrics } from '@/lib/simulation';
import { InfoTooltip } from './InfoTooltip';

interface ClassificationReportProps {
  metrics: ClassificationMetrics[];
}

export function ClassificationReport({ metrics }: ClassificationReportProps) {
  const totalSupport = metrics.reduce((s, m) => s + m.support, 0);
  const weightedF1 = metrics.reduce((s, m) => s + m.f1 * m.support, 0) / totalSupport;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">分类性能报告</h3>
        <InfoTooltip content="基于混淆矩阵计算的每协议分类指标。在IoT场景中，召回率特别重要——漏检一个协议可能导致该传感器数据完全丢失。" />
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        <strong>精确率(Precision)</strong> = TP/(TP+FP)，检测结果中真正属于该协议的比例；
        <strong>召回率(Recall)</strong> = TP/(TP+FN)，该协议样本被正确检出的比例；
        <strong>F1</strong> = 2×P×R/(P+R)，精确率和召回率的调和平均数。
        Support = 该协议的真实样本数。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2 text-left text-muted-foreground">协议</th>
              <th className="p-2 text-center text-muted-foreground">Precision</th>
              <th className="p-2 text-center text-muted-foreground">Recall</th>
              <th className="p-2 text-center text-muted-foreground">F1-Score</th>
              <th className="p-2 text-center text-muted-foreground">Support</th>
              <th className="p-2 text-left text-muted-foreground">识别特征</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(m => (
              <tr key={m.protocol} className="border-b border-border/50">
                <td className="p-2 font-medium text-foreground">{m.protocol}</td>
                <td className="p-2 text-center font-mono">{(m.precision * 100).toFixed(1)}%</td>
                <td className="p-2 text-center font-mono">{(m.recall * 100).toFixed(1)}%</td>
                <td className="p-2 text-center font-mono font-semibold">{(m.f1 * 100).toFixed(1)}%</td>
                <td className="p-2 text-center text-muted-foreground">{m.support.toLocaleString()}</td>
                <td className="p-2 text-muted-foreground">
                  {m.protocol === 'modbus_rtu' && 'CRC16校验 + 功能码'}
                  {m.protocol === 'mqtt' && '固定报头 0x30-0x3F'}
                  {m.protocol === 'opcua' && '"OPN" 魔术字节'}
                  {m.protocol === 'coap' && '版本号 01xx (0x4x) + 响应码'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border">
              <td className="p-2 font-semibold text-foreground">加权平均</td>
              <td className="p-2 text-center">—</td>
              <td className="p-2 text-center">—</td>
              <td className="p-2 text-center font-mono font-semibold">{(weightedF1 * 100).toFixed(1)}%</td>
              <td className="p-2 text-center text-muted-foreground">{totalSupport.toLocaleString()}</td>
              <td className="p-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        💡 Modbus RTU通过CRC16校验实现近100%精确率；MQTT依赖固定报头特征(0x30-0x3F)；
        OPC UA通过"OPN"魔术字节签名识别；CoAP通过版本号模式(首字节01xxxxxx=0x4x)和响应码结构识别。
        四种协议特征正交性高，因此整体F1较高。
      </p>
    </div>
  );
}
