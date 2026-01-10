import { PieChart } from "@mui/x-charts/PieChart";
import type { TypeBudgets } from "../../utils/DataContext";
import "./chart.css";

type PieChart = {
  budgets: TypeBudgets[] | null;
  granT: number;
};

export default function BasicPie({ budgets, granT }: PieChart) {
  if (!budgets || budgets.length === 0) return <p>No budget data.</p>;
  const total = budgets.reduce(
    (sum: number, b: { maximum: number }) => sum + b.maximum,
    0
  );
  const spent = granT;
  const PieData = budgets.map((item) => ({
    id: item.id,
    value: item.maximum,
    color: item.theme,
  }));
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PieChart
        series={[
          {
            data: PieData,
          },
        ]}
        width={240}
        height={240}
      />
      <div className="chart2">
        <div className="chart-inner">
          <h1>${spent}</h1>
          <h5>of ${total} limit</h5>
        </div>
      </div>
    </div>
  );
}
