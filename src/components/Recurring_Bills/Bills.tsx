import formatDate from "../../utils/convertDate";
import { DataContext } from "../../utils/DataContext";
import { useContext } from "react";
import { Input_Search, Input_Select } from "../Inputs/Search_Input";
import { PiSortAscendingFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";

export default function Bills() {
  const { transactionsData } = useContext(DataContext);
  return (
    <>
      <div id="inputs-bills">
        <Input_Search placeholder="bills" />
        <Input_Select label="Sort By">
          <PiSortAscendingFill />
        </Input_Select>
      </div>
      <div className="overviewTransactions desktop" id="headings">
        <h5>Bill Title</h5>
        <h5>Due Date</h5>
        <h5>Amount</h5>
      </div>
      {transactionsData
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
        ))}
    </>
  );
}
