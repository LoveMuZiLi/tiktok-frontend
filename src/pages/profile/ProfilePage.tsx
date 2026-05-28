import { Menu, Share2, Edit3, Bookmark, Lock, Heart, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { fetchUserProfile, fetchVideoFeed } from "@/shared/api/client";
import { CURRENT_USER_ID } from "@/shared/constants";
import type { UserProfile } from "@/shared/types/user";
import type { Video } from "@/shared/types/video";

const tabs = [
  { id: "works", icon: Play, label: "作品" },
  { id: "private", icon: Lock, label: "私密" },
  { id: "favorites", icon: Bookmark, label: "收藏" },
  { id: "likes", icon: Heart, label: "喜欢" },
];

function formatCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}w`;
  return String(n);
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("works");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [works, setWorks] = useState<Video[]>([]);

  useEffect(() => {
    fetchUserProfile(CURRENT_USER_ID)
      .then(setProfile)
      .catch(() => setProfile(null));
    fetchVideoFeed({ feed: "user", targetId: CURRENT_USER_ID, limit: 30 })
      .then(setWorks)
      .catch(() => setWorks([]));
  }, []);

  const user = profile?.user;

  return (
    <div className="h-full w-full bg-black text-white overflow-y-auto pb-20">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-12 bg-black/95 backdrop-blur-sm">
        <Menu className="w-5 h-5" />
        <span>我</span>
        <Share2 className="w-5 h-5" />
      </div>

      <div className="px-4 pt-4 flex flex-col items-center">
        <ImageWithFallback
          src={user?.avatar ?? "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=200&h=200&fit=crop"}
          alt="me"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="mt-3 text-base">@{user?.username ?? "my_account"}</div>
        <div className="text-sm text-white/55 mt-1">
          抖音号：{user?.douyinId ?? "—"}
        </div>

        <div className="flex items-center gap-8 mt-5">
          <div className="text-center">
            <div className="text-base">{profile?.followingCount ?? 0}</div>
            <div className="text-xs text-white/55">关注</div>
          </div>
          <div className="text-center">
            <div className="text-base">{formatCount(profile?.followerCount ?? 0)}</div>
            <div className="text-xs text-white/55">粉丝</div>
          </div>
          <div className="text-center">
            <div className="text-base">{formatCount(profile?.totalLikes ?? 0)}</div>
            <div className="text-xs text-white/55">获赞</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5 w-full">
          <button className="flex-1 bg-white/10 rounded-lg py-2 text-sm flex items-center justify-center gap-1">
            <Edit3 className="w-4 h-4" /> 编辑资料
          </button>
          <button className="flex-1 bg-white/10 rounded-lg py-2 text-sm">分享主页</button>
          <button className="bg-white/10 rounded-lg p-2">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 text-sm text-white/75 text-center">
          {user?.bio ?? "记录生活，分享美好 ✨"}
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
              className={`flex-1 py-3 flex items-center justify-center gap-1 text-sm border-b-2 ${
                active ? "border-white text-white" : "border-transparent text-white/55"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {activeTab === "works" ? (
        <div className="grid grid-cols-3 gap-0.5">
          {works.map((w) => (
            <div key={w.id} className="relative aspect-[3/4] bg-white/5">
              <ImageWithFallback src={w.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 left-1 text-xs flex items-center gap-0.5">
                <Play className="w-3 h-3" />
                {formatCount(w.likes)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-white/40 text-sm">暂无内容</div>
      )}
    </div>
  );
}
