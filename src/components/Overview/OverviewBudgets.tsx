import { DataContext } from "../../utils/DataContext";
import { useContext } from "react";
import "./OverviewStyles.css";
import BasicPie from "../Chart/PiechartLibrary";
// import PieChart from "../Chart/PieChart";
// import PieChartSvg from "../Chart/PieChartSvg";
import DetailLabel from "../DetailsLabel";
import { memo } from "react";
import {
  useGrandTotal,
  useTotalSpentByCategory,
} from "../../hooks/useBudgetsMemo";

function OverviewBudgets() {
  const { budgetsData, transactionsData } = useContext(DataContext);
  const totalSpentByCategory = useTotalSpentByCategory(
    budgetsData,
    transactionsData!
  );
  const grand_total = useGrandTotal(totalSpentByCategory);
  return (
    <div className="overviewBudgets">
      {/* <PieChart budgets={budgetsData} grandT={grand_total} /> */}
      {/* <PieChartSvg budgets={budgetsData} grandT={grand_total} /> */}
      <BasicPie budgets={budgetsData} granT={grand_total} />
      <div className="detailInfo">
        {budgetsData?.slice(0, 5).map((item) => (
          <DetailLabel item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default memo(OverviewBudgets);
