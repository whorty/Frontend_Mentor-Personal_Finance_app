import { useContext } from "react";
import type { MoneyWithdraw } from "../components/modals/PotAmountModal";
import { updatePot } from "../utils/db";
import { DataContext } from "../utils/DataContext";

export default function usePotAction() {
  const { setPotsData } = useContext(DataContext);

  async function handlePotSubmit(
    e: React.FormEvent<HTMLFormElement>,
    ammount: number,
    props: MoneyWithdraw
  ) {
    e.preventDefault();
    const button = e.currentTarget.querySelector(
      "button[type='submit']"
    ) as HTMLButtonElement;
    button.disabled = true;
    const { id, mode, target, total, ToggleModal } = props;
    if (ammount <= 0) {
      alert("the ammount to add must be greater than 0");
      button.disabled = false;
      return;
    }
    let newTotal = 0;
    if (mode == "Add") newTotal = ammount + total;
    if (mode == "withdraw") newTotal = total - ammount;
    if (mode == "Add" && target < newTotal) {
      alert("greater than target!");
      button.disabled = false;
      return;
    }
    if (mode == "withdraw" && ammount > total) {
      alert("Insufficient Funds");
      button.disabled = false;
      return;
    }
    const result = await updatePot(id, { total: newTotal });
    if (result && setPotsData) {
      console.log("Pot updated successfully:", result);
      setPotsData((prevPots) =>
        prevPots.map((pot) => (pot.id === id ? { ...pot, ...result[0] } : pot))
      );
      ToggleModal();
    } else {
      console.error("Failed to update Pot");
    }
  }
  return { handlePotSubmit };
}
