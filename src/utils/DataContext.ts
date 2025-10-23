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

export const DataContext = React.createContext<Balance[] | null>([]);
