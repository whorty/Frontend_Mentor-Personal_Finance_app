import { calcPercentage } from "../../utils/math";
import "./ProgressBar.css";

interface ProgressBar {
  theme: string;
  total: number;
  target: number;
  mode?: "Add" | "withdraw";
  newTotal?: number;
  color?: string;
}

export function ProgressBarPots({
  theme,
  total,
  target,
  mode,
  color,
  newTotal,
}: ProgressBar) {
  let invest, take;
  const balance = calcPercentage(total, target);
  if (newTotal !== undefined) {
    invest = calcPercentage(newTotal, target) + "%";
    take = parseFloat(balance) - parseFloat(invest);
  }
  const styleTake = parseFloat(balance) == take ? "fullwithdraw" : "";
  return (
    <div className={`progress-bar ${mode}`} style={{ marginBottom: "13px" }}>
      <div
        className="progress-fill bar-default"
        style={{
          width:
            mode == "Add"
              ? balance + "%"
              : mode == "withdraw"
              ? invest
              : balance + "%",
          backgroundColor: theme,
        }}
      ></div>
      {mode && (
        <div
          className={`progress-fill ${mode + " " + styleTake}`}
          style={{
            width: mode == "Add" ? invest : take + "%",
            backgroundColor: mode == "Add" ? color : "#c94736",
          }}
        ></div>
      )}
    </div>
  );
}

export function ProgressBarBudgets({ theme, total, target }: ProgressBar) {
  return (
    <div className="progress-barEx">
      <div
        className="progress-fill"
        style={{
          width: calcPercentage(total, target) + "%",
          backgroundColor: theme,
        }}
      ></div>
    </div>
  );
}
