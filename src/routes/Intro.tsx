import Banner from "../components/Index/Banner";
import { Outlet } from "react-router-dom";

export default function Intro() {
  return (
    <main>
      <div className="container">
        <Banner />
        <Outlet />
      </div>
    </main>
  );
}
