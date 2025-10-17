import CardInfo from "../components/Overview/CardInfo";
import "../components/Overview/OverviewStyles.css";

export default function Overview() {
  return (
    <section className="overview">
      <h1>Overview</h1>
      <section className="main-info">
        <CardInfo />
      </section>
    </section>
  );
}
