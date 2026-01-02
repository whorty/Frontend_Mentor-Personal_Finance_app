import { DataContext } from "../../utils/DataContext";
import { useContext } from "react";
import "./OverviewStyles.css";
// import BasicPie from "../Chart/PiechartLibrary";
import PieChart from "../Chart/PieChart";
import DetailLabel from "../DetailsLabel";

export default function OverviewBudgets() {
  const { budgetsData, grandTotal } = useContext(DataContext);
  return (
    <div className="overviewBudgets">
      <PieChart budgets={budgetsData} grandT={grandTotal[0]?.grand_total} />
      {/* <BasicPie budgets={budgetsData} /> */}
      <div className="detailInfo">
        {budgetsData?.slice(0, 5).map((item) => (
          <DetailLabel item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
