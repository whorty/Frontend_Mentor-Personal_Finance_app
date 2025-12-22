import React from "react";

type Generic = {
  id: number;
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
}

export interface TypeBudgets extends Generic {
  category: string;
  maximum: number;
  theme: string;
}

export interface PromiseVal {
  BalanceData: Balance[] | null;
  potsData: Total[];
  transactionsData: Transaction[] | null;
  budgetsData: TypeBudgets[] | null;
  refetchBudgets?: () => Promise<void>;
}

export const DataContext = React.createContext<PromiseVal>({
  BalanceData: null,
  potsData: [],
  transactionsData: [],
  budgetsData: [],
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
