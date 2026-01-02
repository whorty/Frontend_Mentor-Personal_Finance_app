import { useSummaryBillsData } from "../../hooks/useSummaryBillsData";

export default function Summary() {
  const data = useSummaryBillsData();
  return (
    <div className="white-card">
      <h3>Summary</h3>
      {data.map((item) => (
        <div className="list-style" key={item.name}>
          <h4>{item.name}</h4>
          <h4>
            <strong>$({item.bill})</strong>
          </h4>
        </div>
      ))}
    </div>
  );
}
