import { Home, Users, PlusSquare, MessageCircleMore, User } from "lucide-react";

type TabId = "home" | "friends" | "create" | "inbox" | "profile";

interface BottomNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const navItems: { id: TabId; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "首页" },
    { id: "friends", icon: Users, label: "朋友" },
    { id: "create", icon: PlusSquare, label: "" },
    { id: "inbox", icon: MessageCircleMore, label: "消息" },
    { id: "profile", icon: User, label: "我" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-sm border-t border-white/10 z-50">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isCreate = item.id === "create";

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              {isCreate ? (
                <div className="relative w-12 h-8">
                  <div className="absolute inset-y-0 left-0 w-9 bg-[#25f4ee] rounded-lg" />
                  <div className="absolute inset-y-0 right-0 w-9 bg-[#fe2c55] rounded-lg" />
                  <div className="absolute inset-y-0 left-1.5 right-1.5 bg-white rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                </div>
              ) : (
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
