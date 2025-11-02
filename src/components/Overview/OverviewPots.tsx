// import data from "../../utils/data.json";
import { DataContext, type Total } from "../../utils/DataContext";
import { useContext } from "react";

function getTotalTarget(pots: Total[]): number {
  return pots.reduce((sum: number, item: Total) => sum + item.total, 0);
}

// console.log("valor total:", getTotalTarget(pots));

export default function OverviewPots() {
  const { potsData } = useContext(DataContext);
  // const { pots } = data;
  console.log(potsData);
  // console.log("data.json:", pots);
  // const totalSaved = getTotalTarget(pots);
  const totalSaved2 = getTotalTarget(potsData);
  console.log("total:", totalSaved2);
  return (
    <div className="overviewPots">
      <div className="total">
        <div>
          <img
            src="./src/assets/images/icons/icon-pot.svg"
            alt="icon of pots"
          />
        </div>
        <div>
          <h4>Total Saved</h4>
          <h1>{`$${totalSaved2}`}</h1>
        </div>
      </div>
      <div className="detailInfo">
        {potsData.slice(0, 4).map((item) => (
          <div key={item.id}>
            <div className="bar" style={{ backgroundColor: item.theme }}></div>
            <div>
              <h5>{item.name}</h5>
              <h4 className="bold">
                <strong>{`$${item.total}`}</strong>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
