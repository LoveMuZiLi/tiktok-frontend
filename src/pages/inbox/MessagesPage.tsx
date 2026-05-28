import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
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
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { paths } from "@/router/paths";
import {
  fetchChats,
  fetchMessages,
  fetchNotifications,
  sendMessage,
} from "@/shared/api/client";
import type { Chat, Message, Notification } from "@/shared/types/inbox";

type ChatLocationState = { name?: string; avatar?: string };

export function MessagesPage() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();
  const routeState = location.state as ChatLocationState | null;

  const [chats, setChats] = useState<Chat[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatTitle, setChatTitle] = useState("");

  const convId = chatId ? Number(chatId) : 0;

  useEffect(() => {
    fetchChats().then(setChats).catch(() => setChats([]));
    fetchNotifications().then(setNotifications).catch(() => setNotifications([]));
  }, []);

  useEffect(() => {
    if (!convId) return;
    const chat = chats.find((c) => c.id === convId);
    setChatTitle(chat?.name ?? routeState?.name ?? "聊天");
    fetchMessages(convId)
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [convId, chats, routeState?.name]);

  const openProfile = (friend: { id: number; name: string; avatar: string }) => {
    navigate(paths.user(friend.id), { state: { name: friend.name, avatar: friend.avatar } });
  };

  const handleSend = async () => {
    if (!messageInput.trim() || !convId) return;
    const text = messageInput.trim();
    setMessageInput("");
    try {
      const msg = await sendMessage(convId, text);
      setMessages((prev) => [...prev, msg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text, isMine: true, time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }
  };

  if (convId) {
    return (
      <div className="h-full w-full bg-black text-white flex flex-col">
        <div className="sticky top-0 z-10 bg-black border-b border-white/10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center px-2 h-14">
            <button type="button" onClick={() => navigate(paths.inbox)} className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center justify-center min-w-0">
              <span className="font-medium truncate">{chatTitle}</span>
              <span className="text-[10px] text-white/40">在线</span>
            </div>
            <button type="button" className="p-2">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] flex flex-col gap-1 ${msg.isMine ? "items-end" : "items-start"}`}>
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
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="发送消息..."
              className="flex-1 bg-white/10 text-white placeholder-white/40 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:bg-white/15"
            />
            <button
              type="button"
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-[#fe2c55] flex items-center justify-center"
            >
              <Send className="w-4 h-4 text-white" fill="white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const followNotifs = notifications.filter((n) => n.type === "follow");
  const activityNotifs = notifications.filter((n) => n.type === "activity");
  const systemNotifs = notifications.filter((n) => n.type === "system");

  return (
    <div className="h-full w-full bg-black text-white overflow-y-auto pb-20">
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm">
        <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 h-12">
          <button type="button" className="p-1">
            <UserPlus className="w-6 h-6" />
          </button>
          <button type="button" className="flex items-center justify-center gap-1">
            <span className="font-semibold">收件箱</span>
            <ChevronDown className="w-4 h-4 text-white/60" />
          </button>
          <button type="button" className="p-1">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="px-3 pt-3 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-start gap-3 min-w-max">
          <button type="button" className="flex flex-col items-center gap-1.5 w-16">
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

          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => openProfile({ id: chat.peerId, name: chat.name, avatar: chat.avatar })}
              className="flex flex-col items-center gap-1.5 w-16"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <ImageWithFallback src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                {chat.unread > 0 && (
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#fe2c55] border-2 border-black" />
                )}
              </div>
              <span className="text-xs truncate w-full text-center">{chat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        {followNotifs[0] && (
          <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-[#20d5ec] flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" fill="white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{followNotifs[0].title}</div>
              <div className="text-xs text-white/55 truncate mt-0.5">{followNotifs[0].body}</div>
            </div>
          </div>
        )}

        {activityNotifs[0] && (
          <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-[#fe2c55] flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{activityNotifs[0].title}</div>
              <div className="text-xs text-white/55 truncate mt-0.5">{activityNotifs[0].body}</div>
            </div>
          </div>
        )}

        {chats.map((chat) => (
          <div
            key={chat.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(paths.inboxChat(chat.id))}
            onKeyDown={(e) => e.key === "Enter" && navigate(paths.inboxChat(chat.id))}
            className="flex items-center gap-3 px-4 py-3 active:bg-white/5 cursor-pointer"
          >
            <ImageWithFallback src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
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

        {systemNotifs[0] && (
          <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Inbox className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{systemNotifs[0].title}</div>
              <div className="text-xs text-white/55 truncate mt-0.5">{systemNotifs[0].body}</div>
            </div>
            {!systemNotifs[0].isRead && <div className="w-2 h-2 rounded-full bg-[#fe2c55] flex-shrink-0" />}
          </div>
        )}
      </div>
    </div>
  );
}
