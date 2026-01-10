import { PiSortAscendingFill } from "react-icons/pi";
import { Input_Search, Input_Select } from "../components/Inputs/Search_Input";
import { TiFilter } from "react-icons/ti";
import "../components/Transactions/transactions.css";
import "../components/Pagination/Pagination.css";
import { useContext, useState, useMemo, useCallback, useEffect } from "react";
import { DataContext, SORT_OPTIONS } from "../utils/DataContext";
import formatDate from "../utils/convertDate";
import Pagination from "../components/Pagination/Pagination";
import { useRenderCount } from "../hooks/useRenderCount";
import { useSearchParams } from "react-router-dom";

export default function Transactions() {
  useRenderCount("Transactions");
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const { transactionsData } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || ""
  );
  const [sortMethod, setSortMethod] = useState<string>("Latest");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(transactionsData?.map((item) => item.category))),
    ],
    [transactionsData]
  );

  // Filter and sort transactions
  const processedTransactions = useMemo(() => {
    // Filter non-recurring transactions
    // let filtered =
    //   transactionsData?.filter((item) => item.recurring === false) ?? [];
    let filtered = transactionsData ?? [];

    // Apply search filter by name
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Apply sorting
    const sortFn =
      SORT_OPTIONS[sortMethod as keyof typeof SORT_OPTIONS] ||
      SORT_OPTIONS.Latest;
    return filtered.slice().sort(sortFn);
  }, [transactionsData, searchQuery, selectedCategory, sortMethod]);

  // Reset to page 1 when filters change
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      setCurrentPage(1);

      if (category && category !== "All") {
        setSearchParams({ category });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  const handleSortChange = useCallback((method: string) => {
    setSortMethod(method);
    setCurrentPage(1);
  }, []);

  // Calculate pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(processedTransactions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentTransactions = useMemo(
    () => processedTransactions.slice(startIdx, endIdx),
    [processedTransactions, startIdx, endIdx]
  );
  return (
    <section>
      <header>
        <h1>Transactions</h1>
      </header>
      <section className="cardinfo bg-white" id="Transactions">
        <div className="filters">
          <Input_Search
            placeholder="Transaction"
            onChange={handleSearchChange}
          />
          <Input_Select label="Sort by" onChange={handleSortChange}>
            <PiSortAscendingFill />
          </Input_Select>
          <Input_Select
            label="Category"
            options={categories}
            onChange={handleCategoryChange}
          >
            <TiFilter />
          </Input_Select>
        </div>
        <div className="overviewTransactions desktop">
          <h5>Recipient / Sender</h5>
          <h5>Category</h5>
          <h5>Transaction Date</h5>
          <h5>Amount</h5>
        </div>
        <div>
          {currentTransactions.map((item) => (
            <div className="overviewTransactions" key={item.id}>
              <img
                src={`/images/avatars/${item.avatar}`}
                className="mobile"
                alt="profile_image"
              />
              <div className="setup">
                <img
                  className="desktop"
                  src={`/images/avatars/${item.avatar}`}
                  alt="profile_image"
                />
                <h4>{item.name}</h4>
              </div>
              <h5>{item.category}</h5>
              <h5>{formatDate(item.date)}</h5>
              <h4 className={item.amount < 0 ? "minus" : "gain"}>
                <strong>{`${item.amount < 0 ? "-$" : "+$"}${Math.abs(
                  item.amount
                ).toFixed(2)}`}</strong>
              </h4>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </section>
  );
}
