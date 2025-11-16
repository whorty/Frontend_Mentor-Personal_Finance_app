import type { TypeBudgets } from "../../utils/DataContext";
import "./chart.css";

type PieChart = {
  budgets: TypeBudgets[] | null;
};

export default function PieChart({ budgets }: PieChart) {
  if (!budgets || budgets.length === 0) return <p>No budget data.</p>;
  const total = budgets.reduce(
    (sum: number, b: { maximum: number }) => sum + b.maximum,
    0
  );
  // console.log(total);
  const spent = 338;
  // console.log("from chart:", budgets);
  // const percentUsed = (spent / totalLimit) * 100;

  let cumulativePercent = 0;

  return (
    <div className="chart">
      {budgets.map((b, i) => {
        const start = cumulativePercent;
        const percent = (b.maximum / total) * 100;
        cumulativePercent += percent;

        return (
          <div
            key={i}
            className="slice"
            style={
              {
                "--color": b.theme,
                "--target": `${start + percent}%`,
                animationDelay: i / budgets.length + "s",
                // transform: `rotate(${start}deg)`,
                zIndex: budgets.length - i,
              } as React.CSSProperties
            }
          ></div>
        );
      })}
      <div className="chart-inner">
        <h1>${spent}</h1>
        <h5>of ${total} limit</h5>
      </div>
    </div>
  );
}
