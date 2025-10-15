import { useState } from "react";
import "../styles/navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoPathSmall from "../assets/images/logo-small.svg";
import logoPathLarge from "../assets/images/logo-large.svg";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();
  console.log(pathname);
  const menuItems = [
    { name: "Overview" },
    { name: "Transactions" },
    { name: "Budgets" },
    { name: "Pots" },
    { name: "RecurringBills" },
  ];
  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="logo">
        <Link to="/">
          {isExpanded ? (
            <img src={logoPathLarge} alt="Logo" />
          ) : (
            <img src={logoPathSmall} className="mini-logo" alt="Logo" />
          )}
        </Link>
      </div>
      <ul className={`menu ${isExpanded && "active"}`}>
        {menuItems.map((item, index) => (
          <li
            className={`${pathname == "/" + item.name ? "PageActive" : ""}`}
            key={index}
          >
            <NavLink to={`/${item.name}`} className="menu-item">
              <span className="icon">
                <img
                  src={`./src/assets/images/icons/icon-nav-${item.name}.svg`}
                />
              </span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="icon">
          <img
            src="./src/assets/images/icons/icon-minimize-menu.svg"
            alt="minimize-arrow-button"
            className={`${isExpanded ? "rotate" : ""}`}
          />
        </span>
        <span>Minimize Menu</span>
      </div>
    </nav>
  );
}
