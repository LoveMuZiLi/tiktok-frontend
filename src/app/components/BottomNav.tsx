import { Home, Users, PlusSquare, MessageCircleMore, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { paths } from "../routes/paths";

const navItems = [
  { to: paths.home, icon: Home, label: "首页", end: true },
  { to: paths.friends, icon: Users, label: "朋友", end: true },
  { id: "create" as const, icon: PlusSquare, label: "" },
  { to: paths.inbox, icon: MessageCircleMore, label: "消息", end: false },
  { to: paths.profile, icon: User, label: "我", end: true },
];

export function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-sm border-t border-white/10 z-50">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCreate = item.id === "create";

          if (isCreate) {
            return (
              <button
                key="create"
                type="button"
                onClick={() => navigate(paths.upload)}
                className="flex flex-col items-center justify-center gap-1 flex-1"
              >
                <div className="relative w-12 h-8">
                  <div className="absolute inset-y-0 left-0 w-9 bg-[#25f4ee] rounded-lg" />
                  <div className="absolute inset-y-0 right-0 w-9 bg-[#fe2c55] rounded-lg" />
                  <div className="absolute inset-y-0 left-1.5 right-1.5 bg-white rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                </div>
              </button>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs transition-colors ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
