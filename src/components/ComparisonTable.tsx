import { InfoTooltip } from './InfoTooltip';

export function ComparisonTable() {
  const rows = [
    { metric: '端到端延迟 (P95)', centralized: '~120 ms', layered: '~48 ms', improvement: '↓ 60%', note: '边缘预处理避免云端往返' },
    { metric: '吞吐量 (msg/s)', centralized: '~2,000', layered: '~8,500', improvement: '↑ 325%', note: '边缘并行处理+本地融合' },
    { metric: '带宽占用', centralized: '100%原始数据上云', layered: '仅融合后数据上云', improvement: '↓ 75%', note: '融合率约25%，4:1压缩' },
    { metric: '单点故障', centralized: '云端宕机全线停', layered: '边缘自治运行', improvement: '高可用', note: '边缘缓存+断网续传' },
    { metric: '协议扩展', centralized: '需改中心代码', layered: '热插拔适配器', improvement: '灵活', note: 'IProtocolAdapter接口' },
    { metric: '数据隐私', centralized: '全量上云', layered: '敏感数据边缘处理', improvement: '合规', note: '符合IEC 62443' },
    { metric: 'CPU占用 (边缘)', centralized: 'N/A', layered: '~35-55%', improvement: '可控', note: 'ARM Cortex-A72级别' },
    { metric: 'CoAP低功耗支持', centralized: '需云端CoAP代理', layered: '边缘直接6LoWPAN桥接', improvement: '低功耗', note: '传感器电池寿命延长2-3倍' },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">架构对比：单层集中式 vs 分层部署</h3>
        <InfoTooltip content="对比传统「所有设备直连云端」的集中式架构与本文提出的「设备-边缘-雾-云」四层架构在延迟、吞吐量、可用性等维度的差异。新增CoAP低功耗协议支持的对比。" />
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        <strong>单层集中式：</strong>所有IoT设备直接将原始数据发送到云端处理，协议翻译和融合均在云端完成。
        优点是架构简单，缺点是延迟高、带宽浪费、单点故障风险大。<br/>
        <strong>分层架构(本文方案)：</strong>协议翻译和时间窗融合下沉到边缘层，仅融合后的标准化数据上云。
        延迟降低约60%，带宽节省约75%，且边缘节点可在断网时自治运行。CoAP设备通过6LoWPAN网关直接接入边缘层，无需云端中转。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2 text-left text-muted-foreground">指标</th>
              <th className="p-2 text-center text-muted-foreground">单层集中式</th>
              <th className="p-2 text-center text-muted-foreground">分层架构(本文)</th>
              <th className="p-2 text-center text-muted-foreground">提升</th>
              <th className="p-2 text-left text-muted-foreground">说明</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="p-2 font-medium text-foreground">{row.metric}</td>
                <td className="p-2 text-center text-muted-foreground">{row.centralized}</td>
                <td className="p-2 text-center font-medium text-foreground">{row.layered}</td>
                <td className="p-2 text-center font-semibold text-industrial-green">{row.improvement}</td>
                <td className="p-2 text-muted-foreground">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
