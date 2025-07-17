import { Outlet } from "react-router";
import { LandingFooter } from "./components/footer";
import { LandingHeader } from "./components/header";

export default function LandingLayout() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
