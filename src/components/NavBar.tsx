import { useState } from "react";
import "../styles/navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
// import logoPathSmall from "../assets/images/logo-small.svg";
import logoPathLarge from "/src/assets/logos/logo-large.svg";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();
  // console.log(pathname);
  const menuItems = [
    { name: "Overview", route: "" },
    { name: "Transactions", route: "transactions" },
    { name: "Budgets", route: "budgets" },
    { name: "Pots", route: "pots" },
    { name: "RecurringBills", route: "recurringBills" },
  ];
  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="logo">
        <Link to="/" className={`reveal ${isExpanded && "active"}`}>
          <img src={logoPathLarge} alt="Logo" />
        </Link>
      </div>
      <ul className={`menu ${isExpanded && "active"}`}>
        {menuItems.map((item, index) => (
          <li
            className={`${
              pathname == "/app/" + item.route ? "PageActive" : ""
            }`}
            key={index}
          >
            <NavLink
              to={item.route == "overview" ? "/app" : `/app/${item.route}`}
              className="menu-item"
            >
              <span className="icon">
                <img
                  src={`/images/icons/icon-nav-${item.name.toLowerCase()}.svg`}
                  alt={`nav_${item.name}`}
                />
              </span>
              <span>
                {item.name == "RecurringBills" ? "Recurring Bills" : item.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="icon">
          <img
            src="/images/icons/icon-minimize-menu.svg"
            alt="minimize-arrow-button"
            className={`${isExpanded ? "rotate" : ""}`}
          />
        </span>
        <span>Minimize Menu</span>
      </div>
    </nav>
  );
}
