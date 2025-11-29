import Summary from "../components/Recurring_Bills/Summary";
import TotalBills from "../components/Recurring_Bills/TotalBills";
import "../components/Recurring_Bills/Recurring.css";
import Bills from "../components/Recurring_Bills/Bills";

export default function RecurringBills() {
  return (
    <section>
      <header>
        <h1>RecurringBills</h1>
      </header>
      <section id="Recurring">
        <div>
          <TotalBills />
          <Summary />
        </div>
        <div className="cardinfo bg-white">
          <Bills />
        </div>
      </section>
    </section>
  );
}
