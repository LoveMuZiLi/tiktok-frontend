import { useEffect, useRef, useState } from "react";
import { VideoCard } from "@/components/business/VideoCard";

type FriendsTab = "following" | "friends";

const followingVideos = [
  {
    id: 101,
    username: "fashion_daily",
    avatar: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=100&h=100&fit=crop",
    description: "周末新穿搭来啦 🌷 你们觉得怎么样？",
    music: "原创音乐 - Fashion Daily",
    image: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 32450,
    comments: 612,
    shares: 188,
  },
  {
    id: 102,
    username: "beauty_tips",
    avatar: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?w=100&h=100&fit=crop",
    description: "三分钟通勤妆，超快出门 💄",
    music: "热门音乐 - Beauty Vibes",
    image: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 58210,
    comments: 1342,
    shares: 421,
  },
  {
    id: 103,
    username: "photo_artist",
    avatar: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=100&h=100&fit=crop",
    description: "今日份夕阳，治愈一切 🌇",
    music: "温柔吉他 - Chill Beats",
    image: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 21870,
    comments: 433,
    shares: 92,
  },
];

const friendsVideos = [
  {
    id: 201,
    username: "urban_life",
    avatar: "https://images.unsplash.com/photo-1733473571611-2cf5460d91fc?w=100&h=100&fit=crop",
    description: "夜骑回家的路，城市真好看 🌃",
    music: "City Lights - Urban Sounds",
    image: "https://images.unsplash.com/photo-1733473571611-2cf5460d91fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 8421,
    comments: 234,
    shares: 56,
  },
  {
    id: 202,
    username: "nature_lover",
    avatar: "https://images.unsplash.com/photo-1728046666871-7ff531542fb1?w=100&h=100&fit=crop",
    description: "周末爬山，呼吸新鲜空气 🌿",
    music: "自然之声 - Peaceful Moments",
    image: "https://images.unsplash.com/photo-1728046666871-7ff531542fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 5123,
    comments: 142,
    shares: 31,
  },
];

export function FriendsPage() {
  const [tab, setTab] = useState<FriendsTab>("friends");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const list = tab === "following" ? followingVideos : friendsVideos;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: 0 });
    setCurrentIndex(0);

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setCurrentIndex(index);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [tab]);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {list.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>

      {/* 顶部 Tab 叠加层（关注 / 朋友） */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-3 pb-3 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setTab("following")}
            className={`relative pb-1 text-sm transition-colors ${
              tab === "following" ? "text-white font-semibold" : "text-white/60"
            }`}
          >
            关注
            {tab === "following" && (
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-white rounded-full" />
            )}
          </button>
          <div className="text-white/40 text-sm">|</div>
          <button
            onClick={() => setTab("friends")}
            className={`relative pb-1 text-sm transition-colors ${
              tab === "friends" ? "text-white font-semibold" : "text-white/60"
            }`}
          >
            朋友
            {tab === "friends" && (
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-white rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* 右上角滚动进度指示器 */}
      <div className="absolute top-14 right-4 z-20 flex flex-col gap-1">
        {list.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-6 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
