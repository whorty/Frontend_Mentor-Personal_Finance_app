import formatDate from "../../utils/convertDate";
import { DataContext, SORT_OPTIONS } from "../../utils/DataContext";
import { useContext, useState, useMemo, useCallback } from "react";
import { Input_Search, Input_Select } from "../Inputs/Search_Input";
import { PiSortAscendingFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";

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

  const processedTransactions = useMemo(() => {
    let filtered =
      transactionsData?.filter((item) => item.recurring == true) ?? [];

    // Apply search filter by name
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sortFn =
      SORT_OPTIONS[sortMethod as keyof typeof SORT_OPTIONS] ||
      SORT_OPTIONS.Latest;
    return filtered.slice().sort(sortFn);
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
      {/* {transactionsData
        ?.filter((item) => item.recurring == true)
        .slice(0, 8)
        .map((item) => (
          <div className="overviewTransactions" key={item.id}>
            <div>
              <img src={`./src/${item.avatar}`} alt="profile_image" />
              <h4>{item.name}</h4>
            </div>
            <h5 className="due-date">
              {formatDate(item.date, "MM-#")}
              <FaCheckCircle />
            </h5>
            <h4 className={item.amount < 0 ? "minus" : "gain"}>
              {`${item.amount < 0 ? "-$" : "+$"}${Math.abs(item.amount).toFixed(
                2
              )}`}
            </h4>
          </div>
        ))} */}
      {processedTransactions?.slice(0, 8).map((item) => (
        <div className="overviewTransactions" key={item.id}>
          <div>
            <img src={`./src/${item.avatar}`} alt="profile_image" />
            <h4>{item.name}</h4>
          </div>
          <h5 className="due-date">
            {formatDate(item.date, "MM-#")}
            <FaCheckCircle />
          </h5>
          <h4 className={item.amount < 0 ? "minus" : "gain"}>
            <strong>{`${item.amount < 0 ? "-$" : "+$"}${Math.abs(
              item.amount
            ).toFixed(2)}`}</strong>
          </h4>
        </div>
      ))}
    </>
  );
}
