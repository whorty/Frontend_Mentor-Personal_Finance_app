import formatDate from "../../utils/convertDate";
import { DataContext, SORT_OPTIONS } from "../../utils/DataContext";
import type { Transaction } from "../../utils/DataContext";
import { useContext, useState, useMemo, useCallback } from "react";
import { Input_Search, Input_Select } from "../Inputs/Search_Input";
import { PiSortAscendingFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";

export default function Bills() {
  const { transactionsData } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState<string>("Latest");

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback((method: string) => {
    setSortMethod(method);
  }, []);

  // Get the latest transaction date as reference
  const referenceDate = useMemo(() => {
    if (!transactionsData || transactionsData.length === 0) {
      return new Date("2024-08-19"); // fallback
    }
    const latestTransaction = transactionsData.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
    return new Date(latestTransaction.date);
  }, [transactionsData]);

  const getPaymentStatus = useCallback(
    (transaction: Transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionDay = transactionDate.getDate();
      const transactionMonth = transactionDate.getMonth();
      const transactionYear = transactionDate.getFullYear();

      const refMonth = referenceDate.getMonth();
      const refYear = referenceDate.getFullYear();

      // Paid: only if transaction is from the same month (August 2024) AND before reference date
      if (
        transactionMonth === refMonth &&
        transactionYear === refYear &&
        transactionDate < referenceDate
      ) {
        return "paid";
      }

      // Due Soon: Calculate next monthly occurrence and check if within 5 days from reference date
      const nextOccurrence = new Date(refYear, refMonth, transactionDay);

      // If next occurrence is before reference date, it's next month
      if (nextOccurrence < referenceDate) {
        nextOccurrence.setMonth(nextOccurrence.getMonth() + 1);
      }

      const fiveDaysAfter = new Date(referenceDate);
      fiveDaysAfter.setDate(fiveDaysAfter.getDate() + 5);

      if (nextOccurrence <= fiveDaysAfter && nextOccurrence >= referenceDate) {
        return "dueSoon";
      }

      return "future";
    },
    [referenceDate]
  );

  const processedTransactions = useMemo(() => {
    let filtered =
      transactionsData?.filter((item) => item.recurring == true) ?? [];

    // Apply search filter by name
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Deduplicate by vendor name - keep only the latest transaction per vendor
    const vendorMap = new Map<string, Transaction>();
    filtered.forEach((transaction) => {
      const vendorName = transaction.name;
      if (
        !vendorMap.has(vendorName) ||
        new Date(transaction.date) > new Date(vendorMap.get(vendorName)!.date)
      ) {
        vendorMap.set(vendorName, transaction);
      }
    });

    const deduplicatedTransactions = Array.from(vendorMap.values());

    const sortFn =
      SORT_OPTIONS[sortMethod as keyof typeof SORT_OPTIONS] ||
      SORT_OPTIONS.Latest;
    return deduplicatedTransactions.slice().sort(sortFn);
  }, [transactionsData, searchQuery, sortMethod]);

  return (
    <>
      <div id="inputs-bills">
        <Input_Search placeholder="bills" onChange={handleSearchChange} />
        <Input_Select label="Sort By" onChange={handleSortChange}>
          <PiSortAscendingFill />
        </Input_Select>
      </div>
      <div className="overviewTransactions desktop" id="headings">
        <h5>Bill Title</h5>
        <h5>Due Date</h5>
        <h5>Amount</h5>
      </div>
      {processedTransactions?.map((item) => {
        const status = getPaymentStatus(item);
        return (
          <div className="overviewTransactions" key={item.id}>
            <div>
              <img src={`/images/avatars/${item.avatar}`} alt="profile_image" />
              <h4>{item.name}</h4>
            </div>
            <h5 className={`due-date ${status == "paid" ? "paid" : ""}`}>
              {formatDate(item.date, "MM-#")}
              {status === "paid" && <FaCheckCircle />}
              {status === "dueSoon" && (
                <RiErrorWarningFill className="bigger-font" />
              )}
            </h5>
            <h4 className={status == "dueSoon" ? "minus due" : "minus"}>
              <strong>{`$${Math.abs(item.amount).toFixed(2)}`}</strong>
            </h4>
          </div>
        );
      })}
    </>
  );
}
