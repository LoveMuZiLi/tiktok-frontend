import { useEffect, useRef, useState } from "react";
import { fetchVideoFeed } from "@/shared/api/client";
import type { Video } from "@/shared/types/video";
import { VideoCard } from "@/components/business/VideoCard";

type FriendsTab = "following" | "friends";

export function FriendsPage() {
  const [tab, setTab] = useState<FriendsTab>("friends");
  const [list, setList] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVideoFeed({ feed: tab, limit: 20 })
      .then(setList)
      .catch(() => setList([]));
  }, [tab]);

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
  }, [tab, list]);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {list.map((video) => (
          <VideoCard key={video.id} videoId={video.id} {...video} />
        ))}
      </div>

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
