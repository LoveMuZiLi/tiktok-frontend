import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { UserPlus, Users } from "lucide-react";
import { fetchVideoFeed } from "@/shared/api/client";
import type { Video } from "@/shared/types/video";
import { VideoCard } from "@/components/business/VideoCard";
import { paths } from "@/router/paths";

type FriendsTab = "following" | "friends";

const emptyCopy: Record<
  FriendsTab,
  { title: string; hint: string; cta: string; icon: typeof UserPlus }
> = {
  following: {
    title: "还没有关注任何人",
    hint: "去关注一个博主吧，发现更多精彩内容",
    cta: "去首页看看",
    icon: UserPlus,
  },
  friends: {
    title: "还没有互关好友",
    hint: "去交一个好友吧，互关后就能在这里看到 TA 的作品",
    cta: "去首页发现",
    icon: Users,
  },
};

export function FriendsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<FriendsTab>("friends");
  const [list, setList] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchVideoFeed({ feed: tab, limit: 20 })
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || list.length === 0) return;
    container.scrollTo({ top: 0 });
    setCurrentIndex(0);

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setCurrentIndex(index);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [tab, list]);

  const empty = emptyCopy[tab];
  const EmptyIcon = empty.icon;
  const isEmpty = !loading && list.length === 0;

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center px-8 pb-24 text-center text-white">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <EmptyIcon className="h-10 w-10 text-white/70" />
          </div>
          <h2 className="text-lg font-semibold">{empty.title}</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55">{empty.hint}</p>
          <button
            type="button"
            onClick={() => navigate(paths.home)}
            className="mt-8 rounded-full bg-[#fe2c55] px-8 py-2.5 text-sm font-medium text-white active:opacity-90"
          >
            {empty.cta}
          </button>
          {tab === "friends" && (
            <button
              type="button"
              onClick={() => navigate(paths.inbox)}
              className="mt-3 text-sm text-white/55 underline-offset-2 hover:text-white/80"
            >
              或去消息里打个招呼
            </button>
          )}
        </div>
      ) : (
        <div
          ref={containerRef}
          className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            <div className="flex h-full items-center justify-center text-white/50 text-sm">
              加载中...
            </div>
          ) : (
            list.map((video) => (
              <VideoCard key={video.id} videoId={video.id} {...video} />
            ))
          )}
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 z-20 pt-3 pb-3 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
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
            type="button"
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

      {list.length > 1 && (
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
      )}
    </div>
  );
}
