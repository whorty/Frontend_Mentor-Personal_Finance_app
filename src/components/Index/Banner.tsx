import logoPathLarge from "/src/assets/logos/logo-large.svg";

export default function Banner() {
  return (
    <div className="banner">
      <div className="overlay">
        <img src={logoPathLarge} alt="logo" />
        <div className="text">
          <h1>Keep track of your money and save for your future</h1>
          <p>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>
  );
}
