import { useContext } from "react";
import { DataContext } from "../../utils/DataContext";

export default function TotalBills() {
  const { summaryBillsData } = useContext(DataContext);
  let Total = 0;
  if (summaryBillsData?.length == 0 || summaryBillsData == null) {
    return (
      <div className="black-card">
        <img
          src="/images/icons/icon-recurring-bills.svg"
          alt="recurring_Bill-logo"
        />
        <h4>Total Bills</h4>
        <h1>...</h1>
      </div>
    );
  }
  Total = Math.abs(
    summaryBillsData[0].total_paid_bills + summaryBillsData[0].total_upcoming
  );
  return (
    <div className="black-card">
      <img
        src="/images/icons/icon-recurring-bills.svg"
        alt="recurring_Bill-logo"
      />
      <h4>Total Bills</h4>
      <h1>${Total}</h1>
    </div>
  );
}
