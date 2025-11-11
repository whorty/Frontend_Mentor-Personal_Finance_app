import type { Total, TypeBudgets } from "../utils/DataContext";

export default function DetailLabel({ item }: { item: Total | TypeBudgets }) {
  console.log(item);
  const label = "category" in item ? item.category : item.name;
  const amount = "total" in item ? item.total : item.maximum.toFixed(2);
  return (
    <div key={item.id}>
      <div className="bar" style={{ backgroundColor: item.theme }}></div>
      <div>
        <h5>{label}</h5>
        <h4 className="bold">
          <strong>{`$${amount}`}</strong>
        </h4>
      </div>
    </div>
  );
}
