import React from "react";

type Generic = {
  id: number;
};

export type Summary = {
  total_paid_bills: number;
  total_due_soon: number;
  total_upcoming: number;
  count_paid_bills: number;
  count_due_soon: number;
  count_total_upcoming: number;
};

export type sumTotal = {
  grand_total: number;
};

export interface Transaction extends Generic {
  amount: number;
  avatar: string;
  category: string;
  date: string;
  name: string;
  recurring: boolean;
}

export interface Balance extends Generic {
  current: number;
  income: number;
  expenses: number;
}

export interface Total extends Generic {
  name: string;
  target: number;
  total: number;
  theme: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface TypeBudgets extends Generic {
  category: string;
  maximum: number;
  theme: string;
}

export interface PromiseVal {
  BalanceData: Balance[] | [];
  potsData: Total[];
  setPotsData?: React.Dispatch<React.SetStateAction<Total[]>>;
  transactionsData: Transaction[] | [];
  budgetsData: TypeBudgets[];
  setBudgetsData?: React.Dispatch<React.SetStateAction<TypeBudgets[]>>;
  summaryBillsData: Summary[] | [];
}

export const DataContext = React.createContext<PromiseVal>({
  BalanceData: [],
  potsData: [],
  setPotsData: undefined,
  transactionsData: [],
  budgetsData: [],
  setBudgetsData: undefined,
  summaryBillsData: [],
});

export const SORT_OPTIONS = {
  Latest: (a: Transaction, b: Transaction) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
  Oldest: (a: Transaction, b: Transaction) =>
    new Date(a.date).getTime() - new Date(b.date).getTime(),
  "A to Z": (a: Transaction, b: Transaction) => a.name.localeCompare(b.name),
  "Z to A": (a: Transaction, b: Transaction) => b.name.localeCompare(a.name),
  Highest: (a: Transaction, b: Transaction) => b.amount - a.amount,
  Lowest: (a: Transaction, b: Transaction) => a.amount - b.amount,
};
