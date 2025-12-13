import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <main>
      <NavBar />
      <Outlet />
      <section>
        <h1>TEST</h1>
      </section>
    </main>
  );
}
