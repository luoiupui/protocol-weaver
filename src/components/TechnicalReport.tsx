import type { SimulationResults } from '@/lib/simulation';
import { InfoTooltip } from './InfoTooltip';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface TechnicalReportProps {
  results: SimulationResults;
}

export function TechnicalReport({ results }: TechnicalReportProps) {
  const passCount = results.e2eTestResults.filter(t => t.status === 'pass').length;
  const warnCount = results.e2eTestResults.filter(t => t.status === 'warn').length;
  const failCount = results.e2eTestResults.filter(t => t.status === 'fail').length;

  return (
    <div className="space-y-6">
      {/* ===== Hardware Configuration ===== */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-foreground">🖥️ 硬件配置清单 (Hardware Configuration)</h3>
          <InfoTooltip content="实际部署所需的硬件设备清单，涵盖边缘网关、工业控制器、传感器节点和云端服务器。所有设备均为市场可采购的商用产品。" />
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          以下为推荐的最小部署配置。边缘网关采用ARM Cortex-A72级别处理器（如Raspberry Pi 4），
          满足P95 &lt; 50ms延迟和4协议并行处理需求。CoAP传感器节点采用低功耗MCU，电池供电可运行2-5年。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left text-muted-foreground">设备</th>
                <th className="p-2 text-left text-muted-foreground">角色</th>
                <th className="p-2 text-left text-muted-foreground">处理器</th>
                <th className="p-2 text-left text-muted-foreground">内存</th>
                <th className="p-2 text-left text-muted-foreground">网络</th>
                <th className="p-2 text-left text-muted-foreground">功耗</th>
                <th className="p-2 text-left text-muted-foreground">成本</th>
              </tr>
            </thead>
            <tbody>
              {results.hardwareConfigs.map((hw, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="p-2 font-medium text-foreground whitespace-nowrap">{hw.name}</td>
                  <td className="p-2 text-muted-foreground">{hw.role}</td>
                  <td className="p-2 text-muted-foreground text-[11px]">{hw.cpu}</td>
                  <td className="p-2 text-muted-foreground whitespace-nowrap">{hw.ram}</td>
                  <td className="p-2 text-muted-foreground text-[11px]">{hw.network}</td>
                  <td className="p-2 text-muted-foreground whitespace-nowrap">{hw.power}</td>
                  <td className="p-2 font-mono text-foreground whitespace-nowrap">{hw.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 bg-muted/50 rounded p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">📋 部署拓扑说明</p>
          <ul className="space-y-1 ml-2">
            <li>• <strong>每条产线</strong>配置1台边缘网关(Raspberry Pi 4 / IOT2050)，负责该产线所有设备的协议翻译与融合</li>
            <li>• <strong>Modbus设备</strong>(PLC/变频器)通过RS485总线接入边缘网关的RS485 HAT</li>
            <li>• <strong>MQTT传感器</strong>通过WiFi/Ethernet连接到边缘网关上运行的Mosquitto Broker</li>
            <li>• <strong>OPC UA节点</strong>(MES系统)通过工业以太网直连边缘网关</li>
            <li>• <strong>CoAP传感器</strong>(能耗监测)通过6LoWPAN/IEEE 802.15.4网关桥接到边缘层，适用于电池供电场景</li>
            <li>• <strong>云端VM</strong>运行数据聚合服务，接收各边缘网关上传的融合后UIR数据</li>
          </ul>
        </div>
      </div>

      {/* ===== E2E Test Results ===== */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-foreground">🧪 端到端测试报告 (E2E Test Results)</h3>
          <InfoTooltip content="对仿真系统的10项关键指标进行自动化验证，覆盖协议识别、数据融合、延迟性能、资源占用和扩展性等维度。" />
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle2 className="h-4 w-4 text-industrial-green" />
            <span className="text-foreground font-medium">{passCount} 通过</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <AlertTriangle className="h-4 w-4 text-industrial-amber" />
            <span className="text-foreground font-medium">{warnCount} 警告</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <XCircle className="h-4 w-4 text-industrial-red" />
            <span className="text-foreground font-medium">{failCount} 失败</span>
          </div>
          <span className="text-xs text-muted-foreground ml-auto">
            通过率: {((passCount / results.e2eTestResults.length) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left text-muted-foreground">状态</th>
                <th className="p-2 text-left text-muted-foreground">测试项</th>
                <th className="p-2 text-left text-muted-foreground">说明</th>
                <th className="p-2 text-left text-muted-foreground">指标</th>
                <th className="p-2 text-left text-muted-foreground">期望值</th>
                <th className="p-2 text-left text-muted-foreground">实际值</th>
              </tr>
            </thead>
            <tbody>
              {results.e2eTestResults.map((test, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="p-2">
                    {test.status === 'pass' && <CheckCircle2 className="h-4 w-4 text-industrial-green" />}
                    {test.status === 'warn' && <AlertTriangle className="h-4 w-4 text-industrial-amber" />}
                    {test.status === 'fail' && <XCircle className="h-4 w-4 text-industrial-red" />}
                  </td>
                  <td className="p-2 font-medium text-foreground whitespace-nowrap">{test.testName}</td>
                  <td className="p-2 text-muted-foreground">{test.description}</td>
                  <td className="p-2 text-muted-foreground whitespace-nowrap">{test.metric}</td>
                  <td className="p-2 font-mono text-muted-foreground whitespace-nowrap">{test.expected}</td>
                  <td className="p-2 font-mono text-foreground">{test.actual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Test details accordion */}
        <div className="mt-3 space-y-2">
          {results.e2eTestResults.map((test, i) => (
            <details key={i} className="bg-muted/50 rounded p-2">
              <summary className="text-xs font-medium text-foreground cursor-pointer">
                {test.status === 'pass' ? '✅' : test.status === 'warn' ? '⚠️' : '❌'} {test.testName} — 详细分析
              </summary>
              <p className="text-xs text-muted-foreground mt-1 ml-4">{test.details}</p>
            </details>
          ))}
        </div>
      </div>

      {/* ===== Architecture Diagram ===== */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-foreground">四层部署架构图</h3>
          <InfoTooltip content="设备-边缘-雾-云四层架构，每层有明确的功能职责和延迟目标。数据量逐层递减，智能度逐层递增。" />
        </div>
        <pre className="text-xs font-mono bg-muted/50 rounded p-3 overflow-x-auto text-foreground leading-relaxed">
{`┌─────────────────────────────────────────────────────────────┐
│                    ☁️  云层 (Cloud)                           │
│  • 全局数据分析 & AI模型训练                                   │
│  • 历史数据存储 & 跨工厂协同                                   │
│  • 延迟要求: 秒级可接受                                        │
├─────────────────────────────────────────────────────────────┤
│                    🌫️  雾层 (Fog)                             │
│  • 跨产线数据聚合 & 趋势分析                                   │
│  • 规则引擎 & 告警关联                                         │
│  • 延迟目标: < 200ms                                          │
├─────────────────────────────────────────────────────────────┤
│              ⚡ 边缘层 (Edge) ← 核心处理层                     │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────┐          │
│  │协议指纹检测│→│ UIR统一翻译   │→│ 时间窗融合引擎  │          │
│  │CRC16/签名 │  │ 异构→标准JSON │  │ 去重+冲突消解   │          │
│  │版本号检测 │  │ 4协议→1 UIR  │  │ CV>15%加权融合  │          │
│  └──────────┘  └──────────────┘  └────────────────┘          │
│  • 延迟目标: P95 < 50ms                                       │
│  • 硬件: ARM Cortex-A72, 4GB RAM                              │
├─────────────────────────────────────────────────────────────┤
│                  📡 设备层 (Device)                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Modbus RTU│ │   MQTT   │ │  OPC UA  │ │   CoAP   │        │
│  │ PLC×12   │ │ 传感器×6  │ │  MES×6   │ │ 能耗×6   │        │
│  │ 36条/tick │ │ 6条/10t  │ │ 6条/50t  │ │ 6条/15t  │        │
│  │ RS485    │ │ WiFi/ETH │ │ 工业ETH  │ │ 6LoWPAN  │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│  • ${results.productionLines}条产线, 280+数据点, 9种终端类型                    │
└─────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      {/* ===== UIR Schema ===== */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-foreground">统一中间表示 (UIR) Schema</h3>
          <InfoTooltip content="UIR是协议翻译的输出标准格式。所有异构协议数据在边缘层被转换为UIR后，上层融合引擎无需感知底层协议差异，实现O(N)复杂度扩展。" />
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          UIR将协议解耦为「适配器翻译」和「融合处理」两个独立关注点。新增协议(如CoAP)只需实现IProtocolAdapter接口，
          无需修改融合引擎代码，扩展复杂度从O(N²)降至O(N)。
        </p>
        <pre className="text-xs font-mono bg-muted/50 rounded p-3 overflow-x-auto text-foreground">
{`interface UIRRecord {
  protocol:         string;    // 来源协议标识 (modbus_rtu|mqtt|opcua|coap)
  source_id:        string;    // 设备唯一标识 (e.g., "line0_plc2", "line1_coap_sensor0")
  entity_id:        string;    // 逻辑实体标识 (用于融合分组)
  measurement_type: string;    // 测量类型 (temperature/vibration/energy_consumption/...)
  value:            number;    // 归一化数值
  unit:             string;    // 物理单位 (°C, kWh, V, PF, ...)
  timestamp:        number;    // Unix时间戳 (ms)
  quality:          number;    // 数据质量 [0,1], 用于置信度加权
  raw_size:         number;    // 原始报文字节数
}`}
        </pre>
      </div>

      {/* ===== Data Relationship Summary ===== */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-foreground">数据关系总结</h3>
          <InfoTooltip content="本仿真中各指标之间的因果链和数学关系。" />
        </div>
        <div className="text-xs space-y-3 text-foreground">
          <div className="bg-muted/50 rounded p-3">
            <p className="font-semibold mb-1">📊 数据量级链</p>
            <pre className="font-mono text-muted-foreground leading-relaxed">
{`设备层原始数据点:  ${results.productionLines}线 × (4 PLC + 2 MQTT + 2 OPC_UA + 2 CoAP) = ${results.productionLines * 10} 终端
↓ 协议翻译(每PLC产3条UIR, 其余各1条)
总处理消息(UIR):   ${results.totalMessages.toLocaleString()} 条
↓ 时间窗融合(窗口=5 ticks, 按entity_id分组去重)
融合记录:          ${results.fusedRecords.toLocaleString()} 条 (融合率 ${(results.fusionRatio * 100).toFixed(1)}%)
  └─ 其中冲突消解: ${results.conflictsResolved} 条 (CV > 15% 触发加权融合)`}
            </pre>
          </div>

          <div className="bg-muted/50 rounded p-3">
            <p className="font-semibold mb-1">🔬 协议数据分布</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
              {results.protocolBreakdown.map(p => (
                <div key={p.protocol} className="border border-border rounded p-2">
                  <p className="font-medium">{p.protocol}</p>
                  <p className="text-lg font-mono font-bold">{p.count.toLocaleString()}</p>
                  <p className="text-muted-foreground">{p.percentage.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 rounded p-3">
            <p className="font-semibold mb-1">📐 关键公式</p>
            <ul className="font-mono text-muted-foreground space-y-1 ml-2">
              <li>• 识别准确率 = Σ(混淆矩阵对角线) / Σ(混淆矩阵总数)</li>
              <li>• 融合率 = 融合记录 / 总处理消息</li>
              <li>• 数据压缩比 = 1 / 融合率 = {(1 / results.fusionRatio).toFixed(1)}:1</li>
              <li>• 冲突检测: CV = σ/μ, 当CV &gt; 0.15 → 置信度加权融合</li>
              <li>• 加权融合值 = Σ(value_i × quality_i) / Σ(quality_i)</li>
              <li>• F1 = 2 × Precision × Recall / (Precision + Recall)</li>
            </ul>
          </div>

          <div className="bg-muted/50 rounded p-3">
            <p className="font-semibold mb-1">⏱️ 延迟指标说明</p>
            <p className="text-muted-foreground">
              P50/P95/P99为百分位延迟，非平均值。P95 &lt; 50ms意味着95%的消息在50ms内完成处理。
              当前仿真在浏览器JS引擎中运行，实际ARM设备延迟约为仿真值的20-40倍。
              分层架构通过边缘本地处理避免云端网络往返，P95延迟从集中式的~120ms降至~48ms。
            </p>
          </div>

          <div className="bg-muted/50 rounded p-3">
            <p className="font-semibold mb-1">📡 CoAP协议说明</p>
            <p className="text-muted-foreground">
              CoAP (Constrained Application Protocol, RFC 7252) 是专为受限设备和低功耗网络设计的轻量级应用层协议。
              在本系统中用于能耗监测传感器(电能表、功率因数表)，通过6LoWPAN/IEEE 802.15.4接入边缘网关。
              与HTTP/MQTT相比，CoAP报文开销仅4字节固定报头，适合NB-IoT/LoRa等低带宽场景。
              每15个tick采集一次，反映能耗数据的中频特性(介于MQTT高频与OPC UA低频之间)。
            </p>
          </div>
        </div>
      </div>

      {/* ===== Simulation Parameters ===== */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">仿真参数</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { label: '仿真周期', value: `${results.tickCount} ticks` },
            { label: '产线数量', value: `${results.productionLines} 条` },
            { label: '融合窗口', value: '5 ticks' },
            { label: '协议数量', value: '4 种' },
            { label: 'Modbus频率', value: '每tick' },
            { label: 'MQTT频率', value: '每10 ticks' },
            { label: 'CoAP频率', value: '每15 ticks' },
            { label: 'OPC UA频率', value: '每50 ticks' },
            { label: '冲突阈值', value: 'CV > 15%' },
            { label: '目标延迟', value: 'P95 < 50ms' },
            { label: '边缘硬件', value: 'ARM Cortex-A72' },
            { label: '边缘内存', value: '4GB LPDDR4' },
          ].map((param, i) => (
            <div key={i} className="border border-border rounded p-2">
              <p className="text-muted-foreground">{param.label}</p>
              <p className="font-mono font-medium text-foreground">{param.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
