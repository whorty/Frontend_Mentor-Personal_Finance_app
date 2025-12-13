import { DataContext } from "../../utils/DataContext";
import { useContext } from "react";
import "./OverviewStyles.css";
// import BasicPie from "../Chart/PiechartLibrary";
import PieChart from "../Chart/PieChart";
import DetailLabel from "../DetailsLabel";

export default function OverviewBudgets() {
  const { budgetsData } = useContext(DataContext);
  // console.log("from component:", budgetsData);
  return (
    <div className="overviewBudgets">
      <PieChart budgets={budgetsData} />
      {/* <BasicPie budgets={budgetsData} /> */}
      <div className="detailInfo">
        {budgetsData?.map((item) => (
          <DetailLabel item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
