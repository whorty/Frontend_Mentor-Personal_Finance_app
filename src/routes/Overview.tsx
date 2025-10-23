import CardInfo from "../components/Overview/CardInfo";
import "../components/Overview/OverviewStyles.css";
import "../components/GenericContainer";
import GenericContainer from "../components/GenericContainer";

export default function Overview() {
  return (
    <section className="overview">
      <h1>Overview</h1>
      <section className="main-info">
        <CardInfo />
      </section>
      <div className="overview-section">
        <GenericContainer name="Pots" route="/Pots">
          hola
        </GenericContainer>
      </div>
    </section>
  );
}
