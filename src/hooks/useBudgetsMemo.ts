import { useMemo } from "react";
import type { Transaction, TypeBudgets } from "../utils/DataContext";
import getLastest from "../utils/getLastest";

/* -------------------------------------------------- */
/* Total spent per category (based on latest txs) */
/* -------------------------------------------------- */
export function useTotalSpentByCategory(
  budgetsData?: TypeBudgets[],
  transactionsData?: Transaction[]
) {
  return useMemo(() => {
    if (!budgetsData || !transactionsData) return {} as Record<string, number>;

    const wanted = budgetsData.map((b) => b.category);
    const filtered = transactionsData.filter((t) =>
      wanted.includes(t.category)
    );

    const lastTransactions = getLastest<Transaction>(filtered);
    if (!lastTransactions) return {} as Record<string, number>;

    return Object.fromEntries(
      Object.entries(lastTransactions).map(([category, txs]) => [
        category,
        txs.reduce((sum, t) => sum + Math.abs(t.amount), 0),
      ])
    );
  }, [budgetsData, transactionsData]);
}

/* -------------------------------------------------- */
/* Grand total */
/* -------------------------------------------------- */
export function useGrandTotal(totalSpentByCategory: Record<string, number>) {
  return useMemo(() => {
    return Object.values(totalSpentByCategory).reduce(
      (sum, value) => sum + value,
      0
    );
  }, [totalSpentByCategory]);
}

/* -------------------------------------------------- */
/* Last transactions map */
/* -------------------------------------------------- */
export function useLastTransactionsMap(transactionsData?: Transaction[]) {
  return useMemo(() => {
    if (!transactionsData) return {} as Record<string, Transaction[]>;

    return getLastest<Transaction>(transactionsData) as Record<
      string,
      Transaction[]
    >;
  }, [transactionsData]);
}

/* -------------------------------------------------- */
/* Available categories */
/* -------------------------------------------------- */
export function useAvailableCategories(
  transactionsData?: Transaction[],
  budgetsData?: TypeBudgets[]
) {
  return useMemo(() => {
    if (!transactionsData) return [] as string[];

    const transCats = Array.from(
      new Set(transactionsData.map((t) => t.category))
    );
    const budgetCats = new Set((budgetsData || []).map((b) => b.category));

    return transCats.filter((c) => !budgetCats.has(c));
  }, [transactionsData, budgetsData]);
}

/* -------------------------------------------------- */
/* Editable categories */
/* -------------------------------------------------- */
export function useEditableCategories(
  transactionsData?: Transaction[],
  budgetsData?: TypeBudgets[],
  selectedBudget?: TypeBudgets
) {
  return useMemo(() => {
    if (!transactionsData || !selectedBudget) return [] as string[];

    const transCats = Array.from(
      new Set(transactionsData.map((t) => t.category))
    );

    const otherBudgetCats = new Set(
      (budgetsData || [])
        .filter((b) => b.id !== selectedBudget.id)
        .map((b) => b.category)
    );

    return transCats.filter((c) => !otherBudgetCats.has(c));
  }, [transactionsData, budgetsData, selectedBudget]);
}

/* -------------------------------------------------- */
/* Initial modal data */
/* -------------------------------------------------- */
export function useInitialBudgetData(selectedBudget?: TypeBudgets) {
  return useMemo(() => {
    if (!selectedBudget) return undefined;

    return {
      category: selectedBudget.category,
      maximum: selectedBudget.maximum,
      theme: selectedBudget.theme,
    };
  }, [selectedBudget]);
}
