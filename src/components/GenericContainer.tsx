import { NavLink } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";

interface GenericContainerProps {
  name: string;
  route: string;
  category?: string;
  children?: React.ReactNode;
}
export default function GenericContainer({
  name,
  route,
  category,
  children,
}: GenericContainerProps) {
  return (
    <div
      className={`generic ${name == "Recurring Bills" ? "Recurring" : name}`}
    >
      <div className="details">
        {name == "Lastest Spending" ? <h3>{name}</h3> : <h2>{name}</h2>}
        <NavLink
          className="link"
          to={`${route}?category=${
            category == undefined ? "" : encodeURIComponent(category)
          }`}
        >
          {["Transactions", "Lastest Spending"].includes(name)
            ? "View All"
            : "See Details"}
          <FaCaretRight />
        </NavLink>
      </div>
      {children}
    </div>
  );
}
