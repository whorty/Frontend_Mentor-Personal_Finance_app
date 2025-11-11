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
}

export const DataContext = React.createContext<PromiseVal>({
  BalanceData: null,
  potsData: [],
  transactionsData: [],
  budgetsData: [],
});
