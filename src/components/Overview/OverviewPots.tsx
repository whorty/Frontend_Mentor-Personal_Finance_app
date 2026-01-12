import { DataContext, type Total } from "../../utils/DataContext";
import { useContext } from "react";
import DetailLabel from "../DetailsLabel";

function getTotalTarget(pots: Total[]): number {
  return pots.reduce((sum: number, item: Total) => sum + item.total, 0);
}
export default function OverviewPots() {
  const { potsData } = useContext(DataContext);
  // const { pots } = data;
  // const totalSaved = getTotalTarget(pots);
  const totalSaved2 = getTotalTarget(potsData);
  return (
    <div className="overviewPots">
      <div className="total">
        <div>
          <img src="/images/icons/icon-pot.svg" alt="icon of pots" />
        </div>
        <div>
          <h4>Total Saved</h4>
          <h1>{`$${totalSaved2}`}</h1>
        </div>
      </div>
      <div className="detailInfo">
        {potsData.slice(0, 4).map((item) => (
          <DetailLabel item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
