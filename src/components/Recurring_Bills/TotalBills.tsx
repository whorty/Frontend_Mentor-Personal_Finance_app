import bill from "../../assets/images/icons/icon-recurring-bills.svg";

export default function TotalBills() {
  return (
    <div className="black-card">
      <img src={bill} alt="recurring_Bill-logo" />
      <h4>Total Bills</h4>
      <h1>$384.98</h1>
    </div>
  );
}
