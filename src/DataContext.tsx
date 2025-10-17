import React from "react";
import data from "./utils/data.json";

type DataType = typeof data;
export const DataContext = React.createContext<DataType | null>(null);
