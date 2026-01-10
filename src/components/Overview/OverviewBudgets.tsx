import { DataContext } from "../../utils/DataContext";
import { useContext, useMemo } from "react";
import "./OverviewStyles.css";
import BasicPie from "../Chart/PiechartLibrary";
// import PieChart from "../Chart/PieChart";
// import PieChartSvg from "../Chart/PieChartSvg";
import DetailLabel from "../DetailsLabel";
import { memo } from "react";

function OverviewBudgets() {
  const { budgetsData, grandTotal } = useContext(DataContext);
  const grand_total = useMemo(() => {
    return grandTotal?.[0]?.grand_total ?? 0;
  }, [grandTotal]);
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
