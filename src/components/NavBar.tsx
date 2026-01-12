import { useState } from "react";
import "../styles/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import supabase from "../supabase-client";
import logoPathLarge from "/src/assets/logos/logo-large.svg";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { name: "Overview", route: "" },
    { name: "Transactions", route: "transactions" },
    { name: "Budgets", route: "budgets" },
    { name: "Pots", route: "pots" },
    { name: "RecurringBills", route: "recurringBills" },
  ];
  async function sessionOut(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    }
    navigate("/");
  }

  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="logo">
        <Link
          to="/"
          onClick={sessionOut}
          className={`reveal ${isExpanded && "active"}`}
        >
          <img src={logoPathLarge} alt="Logo" />
        </Link>
      </div>
      <ul className={`menu ${isExpanded && "active"}`}>
        {menuItems.map((item, index) => (
          <li key={index} className="PageActive">
            <NavLink
              to={item.route ? `/app/${item.route}` : "/app"}
              className={({ isActive }) =>
                `menu-item ${isActive ? "Active" : ""}`
              }
              end={item.route === ""}
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
