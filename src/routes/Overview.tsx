import CardInfo from "../components/Overview/CardInfo";
import "../components/Overview/OverviewStyles.css";
import "../components/GenericContainer";
import GenericContainer from "../components/GenericContainer";
import OverviewPots from "../components/Overview/OverviewPots";
import OverviewTransactions from "../components/Overview/OverviewTransactions";
import OverviewBudgets from "../components/Overview/OverviewBudgets";
import OverviewReBills from "../components/Overview/OverviewReBills";

export default function Overview() {
  return (
    <section id="overview">
      <h1>Overview</h1>
      <section className="main-info">
        <CardInfo />
      </section>
      <div className="overview-section">
        <GenericContainer name="Pots" route="/app/pots">
          <OverviewPots />
        </GenericContainer>
        <GenericContainer name="Budgets" route="/app/budgets">
          <OverviewBudgets />
        </GenericContainer>
        <GenericContainer name="Transactions" route="/app/transactions">
          <OverviewTransactions />
        </GenericContainer>
        <GenericContainer name="Recurring Bills" route="/app/recurringBills">
          <OverviewReBills />
        </GenericContainer>
      </div>
    </section>
  );
}
