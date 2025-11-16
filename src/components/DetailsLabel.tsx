import type { Total, TypeBudgets } from "../utils/DataContext";
import { calcPercentage } from "../utils/math";

export default function DetailLabel({ item }: { item: Total | TypeBudgets }) {
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

type spent = {
  item: Total | TypeBudgets;
  spent?: number;
};

export function SpendingSummaryExt({ item, spent = 0 }: spent) {
  const label = "category" in item ? item.category : item.name;
  const amount = "total" in item ? item.total : item.maximum.toFixed(2);
  const newAmount = Number(amount);
  const percentage = calcPercentage(spent, newAmount);
  return (
    <div className="list-item">
      <div>
        <div className="bar">
          <div
            className="vertical-progress-bar"
            style={{
              height: `${percentage + "%"}`,
              backgroundColor: item.theme,
            }}
          ></div>
        </div>
        <h4>{label}</h4>
      </div>
      <div>
        <h3>{`$${spent.toFixed(2)}`}</h3>
        <h5>{`of $${amount}`}</h5>
      </div>
    </div>
  );
}
