import type { ConfusionMatrixData } from '@/lib/simulation';
import { InfoTooltip } from './InfoTooltip';

interface ConfusionMatrixProps {
  data: ConfusionMatrixData;
}

export function ConfusionMatrix({ data }: ConfusionMatrixProps) {
  const maxVal = Math.max(...data.matrix.flat());
  const total = data.matrix.flat().reduce((a, b) => a + b, 0);
  const diagSum = data.matrix.reduce((s, row, i) => s + row[i], 0);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">混淆矩阵热力图</h3>
        <InfoTooltip
          content="混淆矩阵显示协议指纹检测的分类效果。行表示数据包的真实协议，列表示引擎检测到的协议。对角线上的值越高，表示该协议识别越准确。"
          formula="准确率 = Σ对角线 / Σ总数 = diagonal_sum / total"
        />
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        行 = 真实协议（ground truth），列 = 检测结果（predicted）。
        对角线值 = 正确分类数（{diagSum.toLocaleString()}），总样本 = {total.toLocaleString()}，
        总体准确率 = {(diagSum / total * 100).toFixed(1)}%。
        非对角线值 = 误分类，值越小越好。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="p-2 text-left text-muted-foreground">真实 ↓ / 预测 →</th>
              {data.labels.map(label => (
                <th key={label} className="p-2 text-center font-medium text-foreground">{label}</th>
              ))}
              <th className="p-2 text-center text-muted-foreground">召回率</th>
            </tr>
          </thead>
          <tbody>
            {data.matrix.map((row, i) => {
              const rowSum = row.reduce((a, b) => a + b, 0);
              const recall = rowSum > 0 ? (row[i] / rowSum * 100).toFixed(1) : '0.0';
              return (
                <tr key={i}>
                  <td className="p-2 font-medium text-foreground">{data.labels[i]}</td>
                  {row.map((val, j) => {
                    const intensity = maxVal > 0 ? val / maxVal : 0;
                    const isDiag = i === j;
                    return (
                      <td
                        key={j}
                        className="p-2 text-center font-mono"
                        style={{
                          backgroundColor: isDiag
                            ? `hsl(142 71% 45% / ${0.15 + intensity * 0.6})`
                            : val > 0
                            ? `hsl(0 84% 60% / ${0.1 + intensity * 0.4})`
                            : 'transparent',
                          color: intensity > 0.6 ? 'white' : undefined,
                        }}
                      >
                        {val.toLocaleString()}
                      </td>
                    );
                  })}
                  <td className="p-2 text-center text-muted-foreground">{recall}%</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-2 text-muted-foreground">精确率</td>
              {data.labels.map((_, j) => {
                const colSum = data.matrix.reduce((s, row) => s + row[j], 0);
                const prec = colSum > 0 ? (data.matrix[j][j] / colSum * 100).toFixed(1) : '0.0';
                return <td key={j} className="p-2 text-center text-muted-foreground">{prec}%</td>;
              })}
              <td className="p-2 text-center font-semibold text-foreground">{(diagSum / total * 100).toFixed(1)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
