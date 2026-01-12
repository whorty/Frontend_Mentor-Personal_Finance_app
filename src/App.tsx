import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./routes/Overview";
import Transactions from "./routes/Transactions";
import Budgets from "./routes/Budgets";
import Pots from "./routes/Pots";
import RecurringBills from "./routes/RecurringBills";
import Login from "./routes/Login";
import {
  DataContext,
  type Balance,
  type Total,
  type Transaction,
  type TypeBudgets,
  type Summary,
} from "./utils/DataContext";
import {
  fetchBalance,
  fetchPots,
  fetchTransactions,
  fetchBudgets,
  fetchSummaryBills,
} from "./utils/db";
import SignUp from "./routes/SignUp";
import Intro from "./routes/Intro";
import AuthRequired from "./components/AuthRequired";
import NotFound from "./routes/NotFound";
import FirstVisitModalManager from "./components/modals/FirstVisitModalManager";

export default function App() {
  const [BalanceData, setBalanceData] = useState<Balance[]>([]);
  const [potsData, setPotsData] = useState<Total[]>([]);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [budgetsData, setBudgetsData] = useState<TypeBudgets[]>([]);
  const [summaryBillsData, setSummaryBillsData] = useState<Summary[]>([]);
  const { session } = useAuth();
  useEffect(() => {
    if (!session) {
      setBalanceData([]);
      setPotsData([]);
      setTransactionsData([]);
      setBudgetsData([]);
      setSummaryBillsData([]);
      return;
    }
    async function loadData() {
      try {
        const [
          dataBalance,
          dataPots,
          dataTransaction,
          dataBudgets,
          dataSummaryBill,
        ] = await Promise.all([
          fetchBalance(),
          fetchPots(),
          fetchTransactions(),
          fetchBudgets(),
          fetchSummaryBills(),
        ]);

        setBalanceData(dataBalance ?? []);
        setPotsData(dataPots ?? []);
        setTransactionsData(dataTransaction ?? []);
        setBudgetsData(dataBudgets ?? []);
        setSummaryBillsData(dataSummaryBill);
      } catch (e) {
        console.error("Failed to load data:", e);
      }
    }
    loadData();
  }, [session]);
  const value = useMemo(
    () => ({
      BalanceData,
      potsData,
      setPotsData,
      transactionsData,
      budgetsData,
      setBudgetsData,
      summaryBillsData,
    }),
    [BalanceData, potsData, transactionsData, budgetsData, summaryBillsData]
  );
  return (
    <BrowserRouter>
      <DataContext.Provider value={value}>
        <FirstVisitModalManager />
        <Routes>
          <Route path="/" element={<Intro />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route element={<AuthRequired />}>
            <Route path="app" element={<Layout />}>
              <Route index element={<Overview />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="budgets" element={<Budgets />} />
              <Route path="pots" element={<Pots />} />
              <Route path="recurringBills" element={<RecurringBills />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}
