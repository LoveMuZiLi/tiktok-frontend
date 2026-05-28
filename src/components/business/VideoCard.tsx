import { Heart, MessageCircle, Share2, Music, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
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

export function VideoCard({
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

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always">
      {/* Background Image/Video */}
      <img
        src={image}
        alt={description}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-6 z-10">
        {/* Avatar */}
        <div className="relative">
          <img
            src={avatar}
            alt={username}
            onClick={onViewProfile}
            className="w-12 h-12 rounded-full border-2 border-white object-cover cursor-pointer"
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#fe2c55] rounded-full flex items-center justify-center text-white text-xs">
            +
          </div>
        </div>

        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <Heart
              className={`w-8 h-8 transition-all ${
                isLiked
                  ? "fill-[#fe2c55] text-[#fe2c55] scale-110"
                  : "text-white group-hover:scale-110"
              }`}
            />
          </div>
          <span className="text-white text-xs">{likeCount}</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-white text-xs">{comments}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 flex items-center justify-center">
            <Share2 className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-white text-xs">{shares}</span>
        </button>

        {/* More */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 flex items-center justify-center">
            <MoreHorizontal className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </div>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-24 left-4 right-20 z-10 text-white">
        <div className="mb-3">
          <h3 className="font-semibold mb-2">@{username}</h3>
          <p className="text-sm mb-3">{description}</p>
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            <span className="text-sm truncate">{music}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
