import { PieChart } from "@mui/x-charts/PieChart";
import type { TypeBudgets } from "../utils/DataContext";

type PieChart = {
  budgets: TypeBudgets[] | null;
};

export default function BasicPie({ budgets }: PieChart) {
  if (!budgets || budgets.length === 0) return <p>No budget data.</p>;
  const total = budgets.reduce(
    (sum: number, b: { maximum: number }) => sum + b.maximum,
    0
  );
  const spent = 350;
  const PieData = budgets.map((item) => ({
    id: item.id,
    value: item.maximum,
    color: item.theme,
  }));
  return (
    <>
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
    </>
  );
}
