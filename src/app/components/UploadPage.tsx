import { X, Image as ImageIcon, Music, Zap, Timer, SwitchCamera, Sparkles } from "lucide-react";
import { useState } from "react";

interface UploadPageProps {
  onClose: () => void;
}

const modes = ["拍照", "拍15秒", "拍60秒", "影集", "直播"];

export function UploadPage({ onClose }: UploadPageProps) {
  const [activeMode, setActiveMode] = useState("拍15秒");

  return (
    <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black" />

      <div className="relative flex items-center justify-between px-4 h-12">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm">
          <Music className="w-4 h-4" />
          <span>选择音乐</span>
        </div>
        <div className="w-6" />
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <div className="text-white/30 text-sm">取景框预览</div>

        <div className="absolute right-4 top-0 flex flex-col gap-5">
          <button className="flex flex-col items-center gap-1">
            <SwitchCamera className="w-6 h-6" />
            <span className="text-xs">翻转</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Zap className="w-6 h-6" />
            <span className="text-xs">闪光灯</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Timer className="w-6 h-6" />
            <span className="text-xs">计时器</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Sparkles className="w-6 h-6" />
            <span className="text-xs">特效</span>
          </button>
        </div>
      </div>

      <div className="relative pb-8">
        <div className="flex items-center justify-center gap-5 mb-4 overflow-x-auto px-4">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMode(m)}
              className={`text-sm whitespace-nowrap ${
                activeMode === m ? "text-white" : "text-white/55"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-around px-8">
          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-xs text-white/75">相册</span>
          </button>

          <button className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-[#fe2c55] scale-110" />
            <div className="w-20 h-20 rounded-full bg-[#fe2c55] border-4 border-white" />
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs text-white/75">道具</span>
          </button>
        </div>
      </div>
    </div>
  );
}
