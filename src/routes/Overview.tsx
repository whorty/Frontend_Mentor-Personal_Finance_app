import CardInfo from "../components/Overview/CardInfo";
import "../components/Overview/OverviewStyles.css";
import "../components/GenericContainer";
import GenericContainer from "../components/GenericContainer";
import OverviewPots from "../components/Overview/OverviewPots";

export default function Overview() {
  return (
    <section id="overview">
      <h1>Overview</h1>
      <section className="main-info">
        <CardInfo />
      </section>
      <div className="overview-section">
        <GenericContainer name="Pots" route="/Pots">
          <OverviewPots />
        </GenericContainer>
        <GenericContainer name="Budgets" route="/Budgets"></GenericContainer>
        <GenericContainer name="Transactions" route="/Transactions">
          hola
        </GenericContainer>
        <GenericContainer name="Recurring Bills" route="/RecurringBills">
          hola
        </GenericContainer>
      </div>
    </section>
  );
}
