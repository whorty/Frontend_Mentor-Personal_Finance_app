import { DataContext } from "../../utils/DataContext";
import formatDate from "../../utils/convertDate";
import { useContext } from "react";

export default function OverviewTransactions() {
  const { transactionsData } = useContext(DataContext);
  return (
    <>
      {transactionsData
        ?.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 5)
        .map((item) => (
          <div className="overviewTransactions" key={item.id}>
            <div>
              <img src={`/images/avatars/${item.avatar}`} alt="profile_image" />
              <h4>{item.name}</h4>
            </div>
            <div>
              <h4 className={item.amount < 0 ? "minus" : "gain"}>
                {`${item.amount < 0 ? "-$" : "+$"}${Math.abs(
                  item.amount
                ).toFixed(2)}`}
              </h4>
              <h5>{formatDate(item.date)}</h5>
            </div>
          </div>
        ))}
    </>
  );
}
