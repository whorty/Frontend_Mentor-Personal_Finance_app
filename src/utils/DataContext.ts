import React from "react";

export interface Transaction {
  id: number;
  amount: number;
  avatar: string;
  category: string;
  date: string;
  name: string;
  recurring: boolean;
}

export interface Balance {
  id: number;
  current: number;
  income: number;
  expenses: number;
}

export interface Total {
  id: number;
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface PromiseVal {
  BalanceData: Balance[] | null;
  potsData: Total[];
  transactionsData: Transaction[] | null;
}

export const DataContext = React.createContext<PromiseVal>({
  BalanceData: null,
  potsData: [],
  transactionsData: [],
});
