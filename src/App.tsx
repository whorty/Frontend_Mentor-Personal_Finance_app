import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./routes/Overview";
import Transactions from "./routes/Transactions";
import Budgets from "./routes/Budgets";
import Pots from "./routes/Pots";
import RecurringBills from "./routes/RecurringBills";
import { DataContext } from "./DataContext";
import data from "./utils/data.json";

export default function App() {
  return (
    <BrowserRouter>
      <DataContext.Provider value={data}>
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
