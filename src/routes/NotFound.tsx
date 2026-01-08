import Banner from "../components/Index/Banner";
import { useRenderCount } from "../hooks/useRenderCount";
export default function NotFound() {
  useRenderCount("notFound");
  return (
    <main>
      <div className="container">
        <Banner />
        <div>
          <h1>404 Not Found</h1>
        </div>
      </div>
    </main>
  );
}
