import { Menu, Share2, Edit3, Bookmark, Lock, Heart, Play } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const works = [
  { id: 1, image: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=400&h=600&fit=crop", views: "12.8w" },
  { id: 2, image: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?w=400&h=600&fit=crop", views: "25.6w" },
  { id: 3, image: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=400&h=600&fit=crop", views: "8.9w" },
  { id: 4, image: "https://images.unsplash.com/photo-1733473571611-2cf5460d91fc?w=400&h=600&fit=crop", views: "44.5w" },
  { id: 5, image: "https://images.unsplash.com/photo-1728046666871-7ff531542fb1?w=400&h=600&fit=crop", views: "16.7w" },
  { id: 6, image: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=400&h=600&fit=crop&sat=-50", views: "5.2w" },
];

const tabs = [
  { id: "works", icon: Play, label: "作品" },
  { id: "private", icon: Lock, label: "私密" },
  { id: "favorites", icon: Bookmark, label: "收藏" },
  { id: "likes", icon: Heart, label: "喜欢" },
];

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("works");

  return (
    <div className="h-full w-full bg-black text-white overflow-y-auto pb-20">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-12 bg-black/95 backdrop-blur-sm">
        <Menu className="w-5 h-5" />
        <span>我</span>
        <Share2 className="w-5 h-5" />
      </div>

      <div className="px-4 pt-4 flex flex-col items-center">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=200&h=200&fit=crop"
          alt="me"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="mt-3 text-base">@my_account</div>
        <div className="text-sm text-white/55 mt-1">抖音号：12345678</div>

        <div className="flex items-center gap-8 mt-5">
          <div className="text-center">
            <div className="text-base">128</div>
            <div className="text-xs text-white/55">关注</div>
          </div>
          <div className="text-center">
            <div className="text-base">5.2w</div>
            <div className="text-xs text-white/55">粉丝</div>
          </div>
          <div className="text-center">
            <div className="text-base">18.6w</div>
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
          记录生活，分享美好 ✨
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
              <span className="text-xs">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {works.map((w) => (
          <div key={w.id} className="relative aspect-[3/4]">
            <ImageWithFallback src={w.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-1 left-1 flex items-center gap-1 text-xs">
              <Play className="w-3 h-3" fill="white" />
              <span>{w.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
