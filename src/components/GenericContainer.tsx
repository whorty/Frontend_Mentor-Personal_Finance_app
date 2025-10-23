import { NavLink } from "react-router-dom";

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
    <div className="generic">
      <div className="details">
        <h2>{name}</h2>
        <NavLink className="link" to={route}>
          {"See Details"}
        </NavLink>
      </div>
      <div className={`body ${name}`}>{children}</div>
    </div>
  );
}
