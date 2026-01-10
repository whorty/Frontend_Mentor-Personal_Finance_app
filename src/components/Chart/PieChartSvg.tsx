import { useMemo, memo } from "react";
import { useRenderCount } from "../../hooks/useRenderCount";
import type { TypeBudgets } from "../../utils/DataContext";
import "./chart.css";

type PieChartProps = {
  budgets: TypeBudgets[] | null;
  grandT: number;
};

const RADIUS = 80;
const STROKE_WIDTH = 39;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function PieChart({ budgets, grandT }: PieChartProps) {
  useRenderCount("PieChart");

  // ✅ Total budget
  const total = useMemo(() => {
    if (!budgets?.length) return 0;
    return budgets.reduce((sum, b) => sum + b.maximum, 0);
  }, [budgets]);

  // ✅ SVG slice math (cumulative, correct)
  const slices = useMemo(() => {
    if (!budgets?.length || total === 0) return [];

    let accumulated = 0;
    let remaining = CIRCUMFERENCE;
    return budgets.map((b) => {
      const percent = b.maximum / total;
      const sliceLength = percent * CIRCUMFERENCE;

      accumulated += sliceLength;
      remaining -= sliceLength;

      return {
        color: b.theme,
        acc: accumulated,
        dasharray: `0 ${CIRCUMFERENCE}`,
        offset: remaining < 0 ? 0 : remaining,
      };
    });
  }, [budgets, total]);
  if (!budgets?.length) return <p>No budget data.</p>;
  return (
    <div className="chart">
      <svg viewBox="0 0 200 200" width="240" height="240">
        <g transform="rotate(-90 100 100)">
          {[...slices].reverse().map((slice, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={slice.color}
              strokeWidth={STROKE_WIDTH}
              // strokeDasharray={slice.dasharray}
              // strokeDashoffset={slice.offset}
              className="pie-slice"
              style={
                {
                  "--Circu": CIRCUMFERENCE,
                  "--acc": slice.acc,
                  "--dash": slice.dasharray,
                  animationDelay: `${(slices.length - i - 1) * 0.3 + 0.1}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      </svg>

      {/* Center label */}
      <div className="chart-inner_svg">
        <h1>${grandT}</h1>
        <h5>of ${total} limit</h5>
      </div>
    </div>
  );
}

export default memo(PieChart);
