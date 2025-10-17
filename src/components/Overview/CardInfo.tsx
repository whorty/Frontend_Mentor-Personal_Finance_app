import { DataContext } from "../../DataContext";
import { useContext } from "react";

type Balance = {
  current: number;
  income: number;
  expenses: number;
};

const formatUSD = (num: number): string =>
  num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default function CardInfo() {
  const { balance } = useContext(DataContext) as { balance: Balance };
  const entries = Object.entries(balance);
  {
    return entries.map(([key, value]) => (
      // console.log(key, value);
      <div className="cardinfo">
        <h4>{key == "current" ? `${key} Balance` : key}</h4>
        <h1>{formatUSD(value)}</h1>
      </div>
    ));
  }
}
