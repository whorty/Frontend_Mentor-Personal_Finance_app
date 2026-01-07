import { IoIosCloseCircleOutline } from "react-icons/io";
import type { Total } from "../../utils/DataContext";
import { ProgressBarPots } from "../progressBar/ProgressBar";
import { calcPercentage } from "../../utils/math";
import { LiaDollarSignSolid } from "react-icons/lia";
import { useState } from "react";
import usePotAction from "../../hooks/updatePot";

export interface MoneyWithdraw extends Total {
  mode: string | undefined;
  ToggleModal: (mode?: "Add" | "withdraw" | undefined) => void;
}

export default function PotAmountModal(props: MoneyWithdraw) {
  const [add, setAdd] = useState<number>(0);
  const { mode, name, ToggleModal } = props;
  const { handlePotSubmit } = usePotAction();

  // Calculate the new total based on mode
  const newTotal = mode === "Add" ? add : props.total - add;
  const currentPercentage = calcPercentage(props.total, props.target);
  const newPercentage = calcPercentage(newTotal, props.target);
  const sumPercentage =
    parseFloat(currentPercentage) + parseFloat(newPercentage);
  const minusPercentage =
    parseFloat(currentPercentage) - parseFloat(newPercentage);
  let message;
  switch (props.mode) {
    case "Add":
      message =
        "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.";
      break;
    case "withdraw":
      message =
        "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.";
      break;
    default:
      message = "something wrong";
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h1>
            {mode == "Add" ? "Add to" : "Withdraw from"} ‘{name}’
          </h1>
          <button
            className="modal-close"
            aria-label="Close"
            onClick={() => ToggleModal(undefined)}
          >
            <IoIosCloseCircleOutline />
          </button>
        </div>
        <h4 className="modal-paragraph">{message}</h4>
        <form
          className="bar-form modal-form"
          onSubmit={(e) => handlePotSubmit(e, add, props)}
        >
          <div className="potCard-barPercent">
            <div className="potCard-info">
              <h4>New Amount</h4>
              <h1>
                {mode == "Add"
                  ? "$" + (add + props.total).toFixed(2)
                  : (props.total - add).toFixed(2)}
              </h1>
            </div>
            <ProgressBarPots
              theme="#000"
              total={props.total}
              target={props.target}
              mode={mode as "Add" | "withdraw"}
              newTotal={newTotal}
              color={props.theme}
            />
            <div className="potCard-info">
              <h5 className={add + props.total > props.total ? mode : ""}>
                <strong>
                  {mode == "Add"
                    ? sumPercentage.toFixed(2) + "%"
                    : minusPercentage.toFixed(2) + "%"}
                </strong>
              </h5>
              <h5>Target of ${props.target}</h5>
            </div>
          </div>
          <label htmlFor={`target-of-${name}-to_${mode}`}>
            Amount to {mode}
          </label>
          <div className="input-layout">
            <div className="input-custom">
              <input
                type="number"
                id={`target-of-${name.replace(" ", "")}-to_${mode}`}
                name="target"
                placeholder={`${props.total}`}
                onChange={(e) => {
                  const x = Number(e.target.value);
                  setAdd(Math.abs(x));
                }}
                min={mode == "Add" ? 0 : 0}
                step="0.5"
                max={
                  mode == "withdraw" ? props.total : props.target - props.total
                }
              />
              <LiaDollarSignSolid />
            </div>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn bg-black">
              {"Amount to " + mode}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
