import "../components/Pots/PotsCards.css";
import PotsCards from "../components/Pots/PotsCards";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";

export default function Pots() {
  const { potsData } = useContext(DataContext);
  console.log(potsData);
  return (
    <section id="Pots">
      <header>
        <h1>Pots</h1>
        <button className="btn bg-black">+ Add New Pot</button>
      </header>
      <section>
        {potsData.map((pot) => (
          <PotsCards key={pot.id} {...pot} />
        ))}
      </section>
    </section>
  );
}
