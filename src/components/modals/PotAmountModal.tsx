export default function PotAmountModal(mode: string) {
  let message;
  switch (mode) {
    case "add":
      message =
        "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.";
      break;
    case "withdraw":
      message =
        "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.";
      break;
    default:
      message = "something wrong";
  }
  return <div>{message}</div>;
}
