import { useContext, useMemo } from "react";
import PieChart from "../components/Chart/PieChart";
import { DataContext, type Transaction } from "../utils/DataContext";
import "../components/Budgets/BudgetsStyles.css";
import DetailLabel, { SpendingSummaryExt } from "../components/DetailsLabel";
import CardHeader from "../components/CardHeader";
import PopupMenu from "../components/PopUpMenu/PopupMenu";
import ellipsis from "../assets/images/icons/icon-ellipsis.svg";
import { ProgressBarBudgets } from "../components/progressBar/ProgressBar";
import getLastest from "../utils/getLastest";
import getLastThreeFromMap from "../utils/getLastThreeFromMap";
import GenericContainer from "../components/GenericContainer";
import TransactionsList from "../components/TransactionsList";

export default function Budgets() {
  const { budgetsData, transactionsData } = useContext(DataContext);
  const totalSpentByCategory = useMemo(() => {
    if (!budgetsData || !transactionsData) return {} as Record<string, number>;
    const wanted = budgetsData.map((item) => item.category);
    const result = transactionsData.filter((t) => wanted.includes(t.category));
    const last3Transactions = getLastest<Transaction>(result);
    if (!last3Transactions) return {} as Record<string, number>;
    return Object.fromEntries(
      Object.entries(last3Transactions).map(([category, txs]) => {
        const total = txs.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return [category, total];
      })
    ) as Record<string, number>;
  }, [budgetsData, transactionsData]);

  const last3TransactionsMap = useMemo(() => {
    if (!transactionsData) return {} as Record<string, Transaction[]>;
    return getLastest<Transaction>(transactionsData) as Record<
      string,
      Transaction[]
    >;
  }, [transactionsData]);
  return (
    <section id="Budgets">
      <header>
        <h1>Budgets</h1>
        <button className="btn bg-black">+ Add New Budget</button>
      </header>
      <section>
        <div id="Summary">
          <div className="generic">
            <PieChart budgets={budgetsData} />
            <div className="spending-summary">
              <h2>Spending Summary</h2>
              {budgetsData?.map((item) => (
                <SpendingSummaryExt
                  key={item.id}
                  item={item}
                  spent={totalSpentByCategory[item.category] ?? 0}
                />
              ))}
            </div>
          </div>
        </div>
        <div id="Budget-details">
          {budgetsData?.map((item) => (
            <div className="cardinfo bg-white" key={item.category}>
              <CardHeader theme={item.theme} name={item.category}>
                <PopupMenu icon={ellipsis} label="Pot" />
              </CardHeader>
              <h4>Maximum of ${item.maximum}</h4>
              <ProgressBarBudgets
                theme={item.theme}
                total={totalSpentByCategory[item.category] ?? 0}
                target={item.maximum}
              />
              <div className="detailInfo">
                <DetailLabel
                  item={{
                    id: item.id,
                    category: "Spent",
                    total: totalSpentByCategory[item.category] ?? 0,
                    theme: item.theme,
                    maximum: 0,
                  }}
                />
                <DetailLabel
                  item={{
                    id: item.id,
                    category: "Remaining",
                    total:
                      item.maximum -
                        (totalSpentByCategory[item.category] ?? 0) >
                      0
                        ? item.maximum -
                          (totalSpentByCategory[item.category] ?? 0)
                        : 0,
                    theme: "#f8f4f0",
                    maximum: 0,
                  }}
                />
              </div>
              <GenericContainer name="Lastest Spending" route="/Transactions">
                {
                  // use precomputed last-3 map for this category
                  (() => {
                    const recent = getLastThreeFromMap(
                      last3TransactionsMap,
                      item.category
                    );
                    if (!recent || recent.length === 0) {
                      return <p className="muted">No recent transactions</p>;
                    }
                    return recent.map((tx) => (
                      <TransactionsList key={tx.id} transfer={tx} />
                    ));
                  })()
                }
              </GenericContainer>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
