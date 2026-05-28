import type {
  InteractionStatus,
  Video,
  VideoComment,
  VideoFeedResponse,
} from "@/shared/types/video";
import type { User, UserProfile } from "@/shared/types/user";
import type { Chat, Message, Notification } from "@/shared/types/inbox";
import { CURRENT_USER_ID } from "@/shared/constants";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

function withUserId(path: string, userId = CURRENT_USER_ID): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}user_id=${userId}`;
}

// --- Videos ---

export function fetchVideoFeed(params?: {
  offset?: number;
  limit?: number;
  feed?: "following" | "friends" | "user";
  targetId?: number;
}): Promise<Video[]> {
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;
  const qs = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
  });
  if (params?.feed) qs.set("feed", params.feed);
  if (params?.targetId) qs.set("target_id", String(params.targetId));
  return request<VideoFeedResponse>(withUserId(`/api/v1/videos?${qs}`)).then(
    (body) => body.items,
  );
}

export function fetchVideo(id: number): Promise<Video> {
  return request<Video>(`/api/v1/videos/${id}`);
}

export function createVideo(data: {
  userId?: number;
  description: string;
  music?: string;
  image: string;
}): Promise<Video> {
  return request<Video>(withUserId("/api/v1/videos"), {
    method: "POST",
    body: JSON.stringify({
      userId: data.userId ?? CURRENT_USER_ID,
      description: data.description,
      music: data.music ?? "",
      image: data.image,
    }),
  });
}

export function updateVideo(
  id: number,
  data: Partial<Pick<Video, "description" | "music" | "image">>,
): Promise<Video> {
  return request<Video>(`/api/v1/videos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteVideo(id: number): Promise<void> {
  return request<void>(`/api/v1/videos/${id}`, { method: "DELETE" });
}

export function fetchInteractionStatus(
  videoId: number,
): Promise<InteractionStatus> {
  return request<InteractionStatus>(
    withUserId(`/api/v1/videos/${videoId}/interactions/status`),
  );
}

export function likeVideo(id: number): Promise<Video> {
  return request<Video>(withUserId(`/api/v1/videos/${id}/like`), {
    method: "POST",
  });
}

export function unlikeVideo(id: number): Promise<Video> {
  return request<Video>(withUserId(`/api/v1/videos/${id}/like`), {
    method: "DELETE",
  });
}

export function favoriteVideo(id: number): Promise<Video> {
  return request<Video>(withUserId(`/api/v1/videos/${id}/favorite`), {
    method: "POST",
  });
}

export function unfavoriteVideo(id: number): Promise<Video> {
  return request<Video>(withUserId(`/api/v1/videos/${id}/favorite`), {
    method: "DELETE",
  });
}

export function shareVideo(id: number): Promise<Video> {
  return request<Video>(withUserId(`/api/v1/videos/${id}/share`), {
    method: "POST",
  });
}

export function fetchVideoComments(
  videoId: number,
  params?: { offset?: number; limit?: number },
): Promise<{ items: VideoComment[]; total: number }> {
  const qs = new URLSearchParams();
  if (params?.offset != null) qs.set("offset", String(params.offset));
  if (params?.limit != null) qs.set("limit", String(params.limit));
  const q = qs.toString();
  return request(
    `/api/v1/videos/${videoId}/comments${q ? `?${q}` : ""}`,
  );
}

export function createVideoComment(
  videoId: number,
  content: string,
): Promise<VideoComment> {
  return request<VideoComment>(withUserId(`/api/v1/videos/${videoId}/comments`), {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

// --- Users ---

export function fetchUserProfile(userId: number): Promise<UserProfile> {
  return request<UserProfile>(`/api/v1/users/${userId}/profile`);
}

export function updateUser(
  id: number,
  data: Partial<User>,
): Promise<User> {
  return request<User>(`/api/v1/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// --- Follows ---

export function followUser(followingId: number): Promise<void> {
  return request(withUserId("/api/v1/follows"), {
    method: "POST",
    body: JSON.stringify({ followingId }),
  });
}

export function unfollowUser(followingId: number): Promise<void> {
  return request<void>(withUserId(`/api/v1/follows/${followingId}`), {
    method: "DELETE",
  });
}

export function fetchFollowStatus(followingId: number): Promise<boolean> {
  return request<{ isFollowing: boolean }>(
    withUserId(`/api/v1/follows/${followingId}/status`),
  ).then((r) => r.isFollowing);
}

// --- Inbox ---

export function fetchChats(): Promise<Chat[]> {
  return request<{ items: Chat[] }>(withUserId("/api/v1/conversations")).then(
    (r) => r.items,
  );
}

export function fetchMessages(conversationId: number): Promise<Message[]> {
  return request<{ items: Message[] }>(
    withUserId(`/api/v1/conversations/${conversationId}/messages`),
  ).then((r) => r.items);
}

export function sendMessage(
  conversationId: number,
  text: string,
): Promise<Message> {
  return request<Message>(
    withUserId(`/api/v1/conversations/${conversationId}/messages`),
    { method: "POST", body: JSON.stringify({ text }) },
  );
}

export function openChat(peerId: number): Promise<number> {
  return request<{ conversationId: number }>(
    withUserId("/api/v1/conversations/open"),
    { method: "POST", body: JSON.stringify({ peerId }) },
  ).then((r) => r.conversationId);
}

// --- Notifications ---

export function fetchNotifications(): Promise<Notification[]> {
  return request<{ items: Notification[] }>(
    withUserId("/api/v1/notifications"),
  ).then((r) => r.items);
}

export function checkHealth(): Promise<{ status: string }> {
  return request<{ status: string }>("/api/v1/health");
}
