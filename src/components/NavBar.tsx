import { useState } from "react";
import "../styles/navbar.css";
import logoPathSmall from "../assets/images/logo-small.svg";
import logoPathLarge from "../assets/images/logo-large.svg";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuItems = [
    { name: "Overview" },
    { name: "Transactions" },
    { name: "Budgets" },
    { name: "Pots" },
    { name: "Recurring bills", path: "recurring-bills" },
  ];
  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="logo">
        {isExpanded ? (
          <img src={logoPathLarge} alt="Logo" />
        ) : (
          <img src={logoPathSmall} alt="Logo" />
        )}
      </div>
      <div className="menu">
        {menuItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <span className="icon">
              <img
                src={`./src/assets/images/icons/icon-nav-${
                  item?.path ? item.path : item.name
                }.svg`}
              />
            </span>
            {isExpanded && <span>{item.name}</span>}
          </div>
        ))}
      </div>

      <div className="toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="icon">
          <img
            src="./src/assets/images/icons/icon-minimize-menu.svg"
            alt="minimize-arrow-button"
            className={`${isExpanded ? "rotate" : ""}`}
          />
          {isExpanded && <span className="ml-200">Minimize Menu</span>}
        </span>
      </div>
    </nav>
  );
}
