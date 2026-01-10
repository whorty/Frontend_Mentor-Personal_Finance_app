import { useMemo, memo } from "react";
import { useRenderCount } from "../../hooks/useRenderCount";
import type { TypeBudgets } from "../../utils/DataContext";
import "./chart.css";

type PieChartProps = {
  budgets: TypeBudgets[] | null;
  grandT: number;
};

function PieChart({ budgets, grandT }: PieChartProps) {
  useRenderCount("PieChart");

  // ✅ Always call hooks first
  const total = useMemo(() => {
    if (!budgets || budgets.length === 0) return 0;
    return budgets.reduce((sum, b) => sum + b.maximum, 0);
  }, [budgets]);

  // ✅ Precompute slices to avoid work during render
  const slices = useMemo(() => {
    if (!budgets || budgets.length === 0 || total === 0) return [];

    let cumulativePercent = 0;

    return budgets.map((b) => {
      const percent = (b.maximum / total) * 100;
      const start = cumulativePercent;
      cumulativePercent += percent;

      return {
        theme: b.theme,
        percent,
        start,
      };
    });
  }, [budgets, total]);

  // ✅ Early return AFTER hooks
  if (!budgets || budgets.length === 0) {
    return <p>No budget data.</p>;
  }

  return (
    <div className="chart">
      {slices.map((slice, i) => (
        <div
          key={i}
          className="slice"
          style={
            {
              "--color": slice.theme,
              "--target": `${slice.start + slice.percent}%`,
              animationDelay: `${i / slices.length}s`,
              zIndex: slices.length - i,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="chart-inner">
        <h1>${grandT}</h1>
        <h5>of ${total} limit</h5>
      </div>
    </div>
  );
}

// ✅ Prevent unnecessary re-renders
export default memo(PieChart);
