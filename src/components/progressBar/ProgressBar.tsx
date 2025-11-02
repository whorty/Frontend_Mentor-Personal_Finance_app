import { calcPercentage } from "../../utils/math";
import "./ProgressBar.css";

interface ProgressBar {
  theme: string;
  total: number;
  target: number;
}

export function ProgressBarPots({ theme, total, target }: ProgressBar) {
  return (
    <div className="progress-bar" style={{ marginBottom: "13px" }}>
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

export function ProgressBarBudgets() {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: "20%" }}></div>
    </div>
  );
}
