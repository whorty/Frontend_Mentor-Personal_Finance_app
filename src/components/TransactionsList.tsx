import formatDate from "../utils/convertDate";
import type { Transaction } from "../utils/DataContext";

export default function TransactionsList({
  transfer,
}: {
  transfer: Transaction;
}) {
  return (
    <div className="overviewTransactions">
      <div>
        <img src={`./src/${transfer.avatar}`} alt="profile_image" />
        <h4>{transfer.name}</h4>
      </div>
      <div>
        <h4 className={transfer.amount < 0 ? "minus" : "gain"}>
          {`${transfer.amount < 0 ? "-$" : "+$"}${Math.abs(
            transfer.amount
          ).toFixed(2)}`}
        </h4>
        <h5>{formatDate(transfer.date)}</h5>
      </div>
    </div>
  );
}
