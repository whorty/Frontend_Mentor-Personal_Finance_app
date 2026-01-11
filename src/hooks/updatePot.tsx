import { useContext } from "react";
import { updatePot, updateBalance, fetchBalance } from "../utils/db"; // Add the updateBalance function
import { DataContext } from "../utils/DataContext";
import type { MoneyWithdraw } from "../components/modals/PotAmountModal";

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
      alert("The amount to add must be greater than 0");
      button.disabled = false;
      return;
    }

    let newTotal = 0;

    // Calculate the new total of the pot
    if (mode === "Add") newTotal = ammount + total;
    if (mode === "withdraw") newTotal = total - ammount;

    // Handle validation based on mode
    if (mode === "Add" && target < newTotal) {
      alert("Amount exceeds target!");
      button.disabled = false;
      return;
    }
    if (mode === "withdraw" && ammount > total) {
      alert("Insufficient Funds");
      button.disabled = false;
      return;
    }

    // Update Pot
    const [data] = (await fetchBalance()) ?? [];
    const { current, user_id } = data;
    console.log(current, "vs", ammount);
    if (mode == "Add" && current < ammount) {
      alert("Insufficient balance funds");
      ToggleModal();
      return;
    }
    const result = await updatePot(id, { total: newTotal });
    console.log(current, user_id, total);
    // Update the user's balance
    let updatedBalance = undefined;
    if (result && setPotsData && user_id !== null) {
      // Deduct or Add from the balance based on mode
      if (mode === "Add") {
        updatedBalance = await updateBalance(user_id, current - ammount); // Deduct from balance
      } else if (mode === "withdraw") {
        updatedBalance = await updateBalance(user_id, current + ammount); // Add to balance
      }
      console.log(updatedBalance);
      // After updating the balance, update the pot data in context
      setPotsData((prevPots) =>
        prevPots.map((pot) => (pot.id === id ? { ...pot, ...result[0] } : pot))
      );
      ToggleModal();
      console.log("Pot updated successfully:", result);
    } else {
      console.error("Failed to update Pot");
    }
  }

  return { handlePotSubmit };
}
