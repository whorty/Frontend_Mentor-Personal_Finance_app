import { NavLink } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";

interface GenericContainerProps {
  name: string;
  route: string;
  children?: React.ReactNode;
}
export default function GenericContainer({
  name,
  route,
  children,
}: GenericContainerProps) {
  return (
    <div
      className={`generic ${name == "Recurring Bills" ? "Recurring" : name}`}
    >
      <div className="details">
        <h2>{name}</h2>
        <NavLink className="link" to={route}>
          {name == "Transactions" ? "View All" : "See Details"}
          <FaCaretRight />
        </NavLink>
      </div>
      {children}
    </div>
  );
}
