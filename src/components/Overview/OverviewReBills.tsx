import { useSummaryBillsData } from "../../hooks/useSummaryBillsData";

export default function OverviewReBills() {
  const data = useSummaryBillsData();
  const capsules = data.map((item) => (
    <div
      key={item.name}
      className="bill-capsule"
      style={{ "--theme": item.theme } as React.CSSProperties}
    >
      <h4>{item.name}</h4>
      <h4>
        <strong>${item.bill}</strong>
      </h4>
    </div>
  ));
  return <div className="overviewRecurring">{capsules}</div>;
}
