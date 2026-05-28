import { Outlet, useLocation } from "react-router";
import { BottomNav } from "../components/BottomNav";

const HIDE_NAV_PREFIXES = ["/upload", "/user/"];

export function AppLayout() {
  const { pathname } = useLocation();
  const showNav = !HIDE_NAV_PREFIXES.some((p) => pathname.startsWith(p));

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <Outlet />
      {showNav && <BottomNav />}
    </div>
  );
}
