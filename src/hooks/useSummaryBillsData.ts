import { useContext } from "react";
import { DataContext } from "../utils/DataContext";

export interface BillData {
  name: string;
  bill: number;
  theme: string;
  count: number;
}

export function useSummaryBillsData(): BillData[] {
  const { summaryBillsData } = useContext(DataContext);

  let bill = 0,
    upcoming = 0,
    due = 0,
    count_total_upcoming = 0,
    count_due_soon = 0,
    count_paid_bills = 0;

  if (summaryBillsData && summaryBillsData.length > 0) {
    bill = Math.abs(summaryBillsData[0].total_paid_bills);
    upcoming = Math.abs(summaryBillsData[0].total_upcoming);
    due = Math.abs(summaryBillsData[0].total_due_soon);
    count_total_upcoming = Math.abs(summaryBillsData[0].count_total_upcoming);
    count_due_soon = Math.abs(summaryBillsData[0].count_due_soon);
    count_paid_bills = Math.abs(summaryBillsData[0].count_total_upcoming);
  }

  return [
    { name: "Paid Bills", bill, theme: "#277c78", count: count_paid_bills },
    {
      name: "Total Upcoming",
      bill: upcoming,
      theme: "#f2cdac",
      count: count_total_upcoming,
    },
    { name: "Due Soon", bill: due, theme: "#82c9d7", count: count_due_soon },
  ];
}
