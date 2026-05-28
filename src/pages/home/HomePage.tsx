import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchVideoFeed } from "@/shared/api";
import type { Video } from "@/shared/types/video";
import { VideoCard } from "@/components/business/VideoCard";
import { paths } from "@/router/paths";

const baseVideos: Video[] = [
  {
    id: 1,
    username: "fashion_daily",
    avatar: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=100&h=100&fit=crop",
    description: "今天的穿搭分享 🌸 喜欢记得点赞哦~",
    music: "原创音乐 - Fashion Daily",
    image: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 128500,
    comments: 2341,
    shares: 892,
  },
  {
    id: 2,
    username: "beauty_tips",
    avatar: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?w=100&h=100&fit=crop",
    description: "超简单的妆容教程 💄 新手也能学会！",
    music: "热门音乐 - Beauty Vibes",
    image: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 256700,
    comments: 4523,
    shares: 1634,
  },
  {
    id: 3,
    username: "photo_artist",
    avatar: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=100&h=100&fit=crop",
    description: "记录生活的美好瞬间 📷✨",
    music: "温柔吉他 - Chill Beats",
    image: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 89300,
    comments: 1876,
    shares: 567,
  },
  {
    id: 4,
    username: "urban_life",
    avatar: "https://images.unsplash.com/photo-1733473571611-2cf5460d91fc?w=100&h=100&fit=crop",
    description: "城市夜景太美了 🌃 你最喜欢哪座城市？",
    music: "City Lights - Urban Sounds",
    image: "https://images.unsplash.com/photo-1733473571611-2cf5460d91fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 445600,
    comments: 7890,
    shares: 2341,
  },
  {
    id: 5,
    username: "nature_lover",
    avatar: "https://images.unsplash.com/photo-1728046666871-7ff531542fb1?w=100&h=100&fit=crop",
    description: "大自然的治愈力量 🌿 放慢脚步，享受当下",
    music: "自然之声 - Peaceful Moments",
    image: "https://images.unsplash.com/photo-1728046666871-7ff531542fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    likes: 167800,
    comments: 3245,
    shares: 1123,
  },
];

function buildBatch(startId: number, count: number): Video[] {
  const out: Video[] = [];
  for (let i = 0; i < count; i++) {
    const src = baseVideos[(startId + i) % baseVideos.length];
    out.push({ ...src, id: startId + i + 1 });
  }
  return out;
}

export function HomePage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<Video[]>(() => buildBatch(0, baseVideos.length));

  useEffect(() => {
    fetchVideoFeed({ offset: 0, limit: baseVideos.length })
      .then((items) => {
        if (items.length > 0) setVideos(items);
      })
      .catch(() => {
        /* 后端未启动时继续使用本地 mock */
      });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - (scrollTop + clientHeight) < clientHeight * 2) {
        setVideos((prev) => {
          if (prev.length > 500) return prev;
          return [...prev, ...buildBatch(prev.length, baseVideos.length)];
        });
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          {...video}
          onViewProfile={() =>
            navigate(paths.user(video.id), {
              state: { name: video.username, avatar: video.avatar },
            })
          }
        />
      ))}
    </div>
  );
}
