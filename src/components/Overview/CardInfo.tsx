import { DataContext } from "../../utils/DataContext";
import { useContext } from "react";

const formatUSD = (num: number): string =>
  num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default function CardInfo() {
  const response = useContext(DataContext);
  console.log(response);
  if (!response)
    return (
      <div className="cardinfo">
        <h4>Error Brining Data</h4>
        <p>Unable to load financial data. Please try again later.</p>
      </div>
    );
  const entries = {
    current: response[0].current,
    expenses: response[0].expenses,
    income: response[0].income,
  };
  const data = Object.entries(entries);
  {
    return data.map(([key, value]) => (
      <div className="cardinfo" key={key}>
        <h4>{key == "current" ? `${key} Balance` : key}</h4>
        <h1>{formatUSD(value)}</h1>
      </div>
    ));
  }
}
