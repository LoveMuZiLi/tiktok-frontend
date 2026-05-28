import { useState } from "react";
import {
  UserPlus,
  Search,
  ChevronDown,
  ChevronLeft,
  Heart,
  Users,
  Inbox,
  Camera,
  Send,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Story {
  id: number;
  name: string;
  avatar: string;
  hasNew?: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread: number;
  hasCamera?: boolean;
}

interface Message {
  id: number;
  text: string;
  isMine: boolean;
  time: string;
}

const stories: Story[] = [
  { id: 1, name: "往昔今日", avatar: "https://images.unsplash.com/photo-1733473571611-2cf5460d91fc?w=200&h=200&fit=crop", hasNew: true },
  { id: 2, name: "DramaMindFa...", avatar: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=200&h=200&fit=crop" },
  { id: 3, name: "啦啦", avatar: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?w=200&h=200&fit=crop" },
  { id: 4, name: "时尚日记", avatar: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=200&h=200&fit=crop" },
  { id: 5, name: "自然爱好者", avatar: "https://images.unsplash.com/photo-1728046666871-7ff531542fb1?w=200&h=200&fit=crop" },
];

const chats: Chat[] = [
  { id: 1, name: "kkkkkk_y", avatar: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?w=100&h=100&fit=crop", message: "发送于 3 天前", time: "3天", unread: 0, hasCamera: true },
  { id: 2, name: "Gang of three", avatar: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=100&h=100&fit=crop", message: "你分享了视频 · 3天", time: "3天", unread: 0, hasCamera: true },
  { id: 3, name: "DramaMindFactory", avatar: "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=100&h=100&fit=crop&sat=-30", message: "发送于 3 天前", time: "3天", unread: 0, hasCamera: true },
  { id: 4, name: "啦啦", avatar: "https://images.unsplash.com/photo-1583318605147-8e52610d9c75?w=100&h=100&fit=crop&sat=-20", message: "发送于 6 天前", time: "6天", unread: 0, hasCamera: true },
  { id: 5, name: "时尚日记", avatar: "https://images.unsplash.com/photo-1728046666898-7e42ed206c9f?w=100&h=100&fit=crop", message: "你的视频拍得太棒了！", time: "刚刚", unread: 2, hasCamera: true },
];

const demoMessages: Message[] = [
  { id: 1, text: "你好！看到你的视频了，拍得真棒！", isMine: false, time: "10:23" },
  { id: 2, text: "谢谢！😊", isMine: true, time: "10:24" },
  { id: 3, text: "能分享一下拍摄技巧吗？", isMine: false, time: "10:26" },
  { id: 4, text: "主要是光线和角度，找自然光好的地方很重要", isMine: true, time: "10:28" },
];

interface MessagesPageProps {
  onViewProfile?: (friend: { id: number; name: string; avatar: string }) => void;
  initialChat?: { name: string; avatar: string };
}

export function MessagesPage({ onViewProfile, initialChat }: MessagesPageProps) {
  const [view, setView] = useState<"main" | "chatDetail">(initialChat ? "chatDetail" : "main");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(
    initialChat
      ? { id: 0, name: initialChat.name, avatar: initialChat.avatar, message: "", time: "", unread: 0 }
      : null
  );
  const [messageInput, setMessageInput] = useState("");

  // 聊天详情视图
  if (view === "chatDetail" && selectedChat) {
    return (
      <div className="h-full w-full bg-black text-white flex flex-col">
        <div className="sticky top-0 z-10 bg-black border-b border-white/10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center px-2 h-14">
            <button onClick={() => setView("main")} className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center justify-center min-w-0">
              <span className="font-medium truncate">{selectedChat.name}</span>
              <span className="text-[10px] text-white/40">在线</span>
            </div>
            <button className="p-2">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {demoMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${msg.isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-2.5 rounded-2xl ${msg.isMine ? "bg-[#fe2c55] text-white" : "bg-white/10 text-white"}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-white/40 px-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-black border-t border-white/10 p-3 pb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="发送消息..."
              className="flex-1 bg-white/10 text-white placeholder-white/40 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:bg-white/15"
            />
            <button className="w-9 h-9 rounded-full bg-[#fe2c55] flex items-center justify-center">
              <Send className="w-4 h-4 text-white" fill="white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 主视图：收件箱
  return (
    <div className="h-full w-full bg-black text-white overflow-y-auto pb-20">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm">
        <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 h-12">
          <button className="p-1">
            <UserPlus className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-center gap-1">
            <span className="font-semibold">收件箱</span>
            <ChevronDown className="w-4 h-4 text-white/60" />
          </button>
          <button className="p-1">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 横向 Story 行 */}
      <div className="px-3 pt-3 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-start gap-3 min-w-max">
          {/* 创建 */}
          <button className="flex flex-col items-center gap-1.5 w-16">
            <div className="relative w-16 h-16 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=200&h=200&fit=crop"
                alt="创建"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#20d5ec] border-2 border-black flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </div>
            <span className="text-xs">创建</span>
          </button>

          {stories.map((story) => (
            <button key={story.id} onClick={() => onViewProfile?.(story)} className="flex flex-col items-center gap-1.5 w-16">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={story.avatar}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                {story.hasNew && (
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#fe2c55] border-2 border-black" />
                )}
              </div>
              <span className="text-xs truncate w-full text-center">{story.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 聚合通知与会话列表 */}
      <div>
        {/* 新粉丝 */}
        <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5">
          <div className="w-12 h-12 rounded-full bg-[#20d5ec] flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-white" fill="white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">新粉丝</div>
            <div className="text-xs text-white/55 truncate mt-0.5">DramaMindFactory 关注了你。</div>
          </div>
        </div>

        {/* 活动 */}
        <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5">
          <div className="w-12 h-12 rounded-full bg-[#fe2c55] flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">活动</div>
            <div className="text-xs text-white/55 truncate mt-0.5">Im andreiaaa!! 查看了你的主页。</div>
          </div>
        </div>

        {/* 私信列表 */}
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChat(chat);
              setView("chatDetail");
            }}
            className="flex items-center gap-3 px-4 py-3 active:bg-white/5"
          >
            <ImageWithFallback
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{chat.name}</div>
              <div className="text-xs text-white/55 truncate mt-0.5">{chat.message}</div>
            </div>
            {chat.unread > 0 ? (
              <div className="bg-[#fe2c55] text-[10px] font-medium rounded-full min-w-[18px] h-[18px] px-1.5 flex items-center justify-center">
                {chat.unread}
              </div>
            ) : chat.hasCamera ? (
              <Camera className="w-5 h-5 text-white/40 flex-shrink-0" />
            ) : null}
          </div>
        ))}

        {/* 系统通知 */}
        <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <Inbox className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">系统通知</div>
            <div className="text-xs text-white/55 truncate mt-0.5">直播: 观众希望看到你的更多内容 · 3天</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#fe2c55] flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
