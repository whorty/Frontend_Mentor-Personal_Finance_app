import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./routes/Overview";
import Transactions from "./routes/Transactions";
import Budgets from "./routes/Budgets";
import Pots from "./routes/Pots";
import RecurringBills from "./routes/RecurringBills";
import { DataContext, type Balance } from "./utils/DataContext";
import { fetchBalance } from "./utils/db";

export default function App() {
  const [BalanceData, setBalanceData] = useState<Balance[] | null>(null);
  useEffect(() => {
    async function loadData() {
      const data = await fetchBalance();
      setBalanceData(data);
    }
    loadData();
  }, []);
  return (
    <BrowserRouter>
      <DataContext.Provider value={BalanceData}>
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
