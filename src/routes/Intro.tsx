import Banner from "../components/Index/Banner";
import { Outlet } from "react-router-dom";
import { useRenderCount } from "../hooks/useRenderCount";

export default function Intro() {
  useRenderCount("intro");
  return (
    <main>
      <div className="container">
        <Banner />
        <Outlet />
      </div>
    </main>
  );
}
