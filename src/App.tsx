import { useEffect, useState } from "react";
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
  type sumTotal,
} from "./utils/DataContext";
import {
  fetchBalance,
  fetchPots,
  fetchTransactions,
  fetchBudgets,
  fetchSummaryBills,
  fetchGrandTotal,
} from "./utils/db";
import SignUp from "./routes/SignUp";
import Intro from "./routes/Intro";
import AuthRequired from "./components/AuthRequired";
import NotFound from "./routes/NotFound";

export default function App() {
  const [BalanceData, setBalanceData] = useState<Balance[] | null>([]);
  const [potsData, setPotsData] = useState<Total[]>([]);
  const [transactionsData, setTransactionsData] = useState<
    Transaction[] | null
  >([]);
  const [budgetsData, setBudgetsData] = useState<TypeBudgets[]>([]);
  const [summaryBillsData, SetSummaryBillsData] = useState<Summary[] | null>(
    []
  );
  const [grandTotal, SetGrandTotal] = useState<sumTotal[]>([]);
  const { session } = useAuth();
  useEffect(() => {
    async function loadData() {
      try {
        const [
          dataBalance,
          dataPots,
          dataTransaction,
          dataBudgets,
          dataSummaryBill,
          dataGrandTotal,
        ] = await Promise.all([
          fetchBalance(),
          fetchPots(),
          fetchTransactions(),
          fetchBudgets(),
          fetchSummaryBills(),
          fetchGrandTotal(),
        ]);

        setBalanceData(dataBalance);
        setPotsData(dataPots);
        setTransactionsData(dataTransaction);
        setBudgetsData(dataBudgets ?? []);
        SetSummaryBillsData(dataSummaryBill);
        SetGrandTotal(dataGrandTotal);
      } catch (e) {
        console.error("Failed to load data:", e);
      }
    }
    loadData();
    if (session) {
      loadData();
    } else {
      setBalanceData([]);
      setPotsData([]);
      setTransactionsData([]);
      setBudgetsData([]);
      SetSummaryBillsData([]);
      SetGrandTotal([]);
    }
  }, [session]);
  const value = {
    BalanceData,
    potsData,
    setPotsData,
    transactionsData,
    budgetsData,
    setBudgetsData,
    summaryBillsData,
    grandTotal,
  };

  // useEffect(() => {
  //   console.count("BalanceData log");
  //   // Resto del código...
  // }, []);
  // console.count("render");

  return (
    <BrowserRouter>
      <DataContext.Provider value={value}>
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
