import { useState } from "react";
import { ChevronLeft, Share2, UserPlus, MessageCircle, Play, Heart, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FriendInfo {
  id: number;
  name: string;
  avatar: string;
}

interface FriendProfilePageProps {
  friend: FriendInfo;
  onBack: () => void;
  onMessage?: (friend: FriendInfo) => void;
}

const workImages = [
  { id: 1, image: "https://images.unsplash.com/photo-1733473571611-2cf5460d91fc?w=400&h=600&fit=crop", views: "44.5w" },
  { id: 2, image: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?w=400&h=600&fit=crop", views: "25.6w" },
  { id: 3, image: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=400&h=600&fit=crop", views: "12.8w" },
  { id: 4, image: "https://images.unsplash.com/photo-1728046666871-7ff531542fb1?w=400&h=600&fit=crop", views: "16.7w" },
  { id: 5, image: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=400&h=600&fit=crop", views: "8.9w" },
  { id: 6, image: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=400&h=600&fit=crop&sat=-50", views: "5.2w" },
];

const tabs = [
  { id: "works", icon: Play, label: "作品" },
  { id: "likes", icon: Heart, label: "喜欢" },
];

export function FriendProfilePage({ friend, onBack, onMessage }: FriendProfilePageProps) {
  const [activeTab, setActiveTab] = useState("works");
  const [following, setFollowing] = useState(true);

  return (
    <div className="h-full w-full bg-black text-white overflow-y-auto pb-20">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-12 bg-black/95 backdrop-blur-sm">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-sm">{friend.name}</span>
        <Share2 className="w-5 h-5" />
      </div>

      <div className="px-4 pt-4 flex flex-col items-center">
        <ImageWithFallback
          src={friend.avatar}
          alt={friend.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="mt-3 text-base">@{friend.name.toLowerCase().replace(/\s+/g, "_")}</div>
        <div className="text-sm text-white/55 mt-1">抖音号：{10000000 + friend.id * 1234567}</div>

        <div className="flex items-center gap-8 mt-5">
          <div className="text-center">
            <div className="text-base">86</div>
            <div className="text-xs text-white/55">关注</div>
          </div>
          <div className="text-center">
            <div className="text-base">3.1w</div>
            <div className="text-xs text-white/55">粉丝</div>
          </div>
          <div className="text-center">
            <div className="text-base">12.4w</div>
            <div className="text-xs text-white/55">获赞</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5 w-full">
          <button
            onClick={() => setFollowing((f) => !f)}
            className={`flex-1 rounded-lg py-2 text-sm flex items-center justify-center gap-1.5 transition-colors ${
              following ? "bg-white/10" : "bg-[#fe2c55]"
            }`}
          >
            {following ? (
              <>已关注</>
            ) : (
              <><UserPlus className="w-4 h-4" /> 关注</>
            )}
          </button>
          <button
            onClick={() => onMessage?.(friend)}
            className="flex-1 bg-white/10 rounded-lg py-2 text-sm flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" /> 私信
          </button>
        </div>

        <div className="mt-4 text-sm text-white/75 text-center">
          热爱生活，记录每一个美好瞬间 🌟
        </div>
      </div>

      <div className="mt-6 flex border-b border-white/10">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-3 flex items-center justify-center gap-1 text-sm border-b-2 transition-colors ${
                active ? "border-white text-white" : "border-transparent text-white/55"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {activeTab === "works" && (
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {workImages.map((w) => (
            <div key={w.id} className="relative aspect-[9/16] overflow-hidden">
              <ImageWithFallback
                src={w.image}
                alt="作品"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 flex items-center gap-0.5 text-white text-xs drop-shadow">
                <Play className="w-3 h-3 fill-white" />
                {w.views}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "likes" && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/40">
          <Lock className="w-10 h-10" />
          <span className="text-sm">该用户设置了隐私保护</span>
        </div>
      )}
    </div>
  );
}
