import { useContext } from "react";
import { DataContext } from "../utils/DataContext";

export interface BillData {
  name: string;
  bill: number;
  theme: string;
}

export function useSummaryBillsData(): BillData[] {
  const { summaryBillsData } = useContext(DataContext);

  let bill = 0,
    upcoming = 0,
    due = 0;

  if (summaryBillsData && summaryBillsData.length > 0) {
    bill = Math.abs(summaryBillsData[0].total_paid_bills);
    upcoming = Math.abs(summaryBillsData[0].total_upcoming);
    due = Math.abs(summaryBillsData[0].total_due_soon);
  }

  return [
    { name: "Paid Bills", bill, theme: "#277c78" },
    { name: "Total Upcoming", bill: upcoming, theme: "#f2cdac" },
    { name: "Due Soon", bill: due, theme: "#82c9d7" },
  ];
}
