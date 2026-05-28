import { Heart, MessageCircle, Share2, Music, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  fetchInteractionStatus,
  likeVideo,
  shareVideo,
  unlikeVideo,
} from "@/shared/api/client";
import { formatCount } from "@/shared/utils/formatCount";

interface VideoCardProps {
  videoId?: number;
  username: string;
  avatar: string;
  description: string;
  music: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  onViewProfile?: () => void;
}

type HeartBurst = { id: number; x: number; y: number };

const DOUBLE_TAP_MS = 300;

export function VideoCard({
  videoId,
  username,
  avatar,
  description,
  music,
  image,
  likes,
  comments,
  shares,
  onViewProfile,
}: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [shareCount, setShareCount] = useState(shares);
  const [bursts, setBursts] = useState<HeartBurst[]>([]);
  const lastTapAt = useRef(0);
  const tapLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLikeCount(likes);
    setShareCount(shares);
  }, [likes, shares]);

  useEffect(() => {
    if (!videoId) return;
    fetchInteractionStatus(videoId)
      .then((s) => setIsLiked(s.liked))
      .catch(() => {});
  }, [videoId]);

  const showHeartBurst = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, x, y }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 800);
  };

  const performLike = async () => {
    if (isLiked || !videoId) return;
    try {
      const updated = await likeVideo(videoId);
      setLikeCount(updated.likes);
      setIsLiked(true);
    } catch {
      setLikeCount((c) => c + 1);
      setIsLiked(true);
    }
  };

  const handleMediaTap = (clientX: number, clientY: number) => {
    const layer = tapLayerRef.current;
    if (!layer) return;
    const rect = layer.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const now = Date.now();

    if (now - lastTapAt.current < DOUBLE_TAP_MS) {
      lastTapAt.current = 0;
      showHeartBurst(x, y);
      void performLike();
      return;
    }
    lastTapAt.current = now;
  };

  const handleLikeButton = async () => {
    if (!videoId) return;
    if (isLiked) {
      try {
        const updated = await unlikeVideo(videoId);
        setLikeCount(updated.likes);
      } catch {
        setLikeCount((c) => Math.max(0, c - 1));
      }
      setIsLiked(false);
      return;
    }
    await performLike();
  };

  const handleShare = async () => {
    if (!videoId) return;
    try {
      const updated = await shareVideo(videoId);
      setShareCount(updated.shares);
    } catch {
      setShareCount((c) => c + 1);
    }
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always">
      <img
        src={image}
        alt={description}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      <div
        ref={tapLayerRef}
        className="absolute inset-0 z-[1] touch-manipulation"
        onClick={(e) => {
          handleMediaTap(e.clientX, e.clientY);
        }}
        onTouchEnd={(e) => {
          if (e.changedTouches.length !== 1) return;
          const t = e.changedTouches[0];
          handleMediaTap(t.clientX, t.clientY);
        }}
        aria-label="双击点赞"
      />

      {bursts.map((b) => (
        <Heart
          key={b.id}
          className="pointer-events-none absolute z-[2] h-28 w-28 fill-[#fe2c55] text-[#fe2c55] animate-heart-pop"
          style={{ left: b.x - 56, top: b.y - 56 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none z-[1]" />

      <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <img
            src={avatar}
            alt={username}
            onClick={onViewProfile}
            className="h-12 w-12 cursor-pointer rounded-full border-2 border-white object-cover"
          />
          <div className="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#fe2c55] text-xs text-white">
            +
          </div>
        </div>

        <button
          type="button"
          onClick={() => void handleLikeButton()}
          className="group flex flex-col items-center gap-1"
        >
          <div className="flex h-12 w-12 items-center justify-center">
            <Heart
              className={`h-8 w-8 transition-all ${
                isLiked
                  ? "scale-110 fill-[#fe2c55] text-[#fe2c55]"
                  : "text-white group-hover:scale-110"
              }`}
            />
          </div>
          <span className="text-xs text-white">{formatCount(likeCount)}</span>
        </button>

        <button type="button" className="group flex flex-col items-center gap-1">
          <div className="flex h-12 w-12 items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
          </div>
          <span className="text-xs text-white">{formatCount(comments)}</span>
        </button>

        <button
          type="button"
          onClick={() => void handleShare()}
          className="group flex flex-col items-center gap-1"
        >
          <div className="flex h-12 w-12 items-center justify-center">
            <Share2 className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
          </div>
          <span className="text-xs text-white">{formatCount(shareCount)}</span>
        </button>

        <button type="button" className="group flex flex-col items-center gap-1">
          <div className="flex h-12 w-12 items-center justify-center">
            <MoreHorizontal className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
          </div>
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-24 left-4 right-20 z-10 text-white">
        <div className="mb-3">
          <h3 className="mb-2 font-semibold">@{username}</h3>
          <p className="mb-3 text-sm">{description}</p>
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span className="truncate text-sm">{music}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
