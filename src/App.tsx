import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./routes/Overview";
import Transactions from "./routes/Transactions";
import Budgets from "./routes/Budgets";
import Pots from "./routes/Pots";
import RecurringBills from "./routes/RecurringBills";
import { DataContext, type Balance, type Total } from "./utils/DataContext";
import { fetchBalance, fetchPots } from "./utils/db";

export default function App() {
  const [BalanceData, setBalanceData] = useState<Balance[] | null>([]);
  const [potsData, setPotsData] = useState<Total[]>([]);
  useEffect(() => {
    async function loadData() {
      const dataBalance = await fetchBalance();
      const dataPots = await fetchPots();
      setBalanceData(dataBalance);
      setPotsData(dataPots);
    }
    loadData();
  }, []);
  // console.log("balanceData:", BalanceData);
  const value = {
    BalanceData,
    potsData,
  };
  return (
    <BrowserRouter>
      <DataContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="overview" element={<Overview />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="pots" element={<Pots />} />
            <Route path="recurringBills" element={<RecurringBills />} />
          </Route>
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}
