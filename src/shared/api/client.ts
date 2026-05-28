import type { Video, VideoFeedResponse } from "@/shared/types/video";

// 生产：VITE_API_BASE_URL 留空，请求走 /api（Nginx 反代到服务器上的 Go 后端）
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function fetchVideoFeed(params?: {
  offset?: number;
  limit?: number;
}): Promise<Video[]> {
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;
  const qs = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
  });
  return request<VideoFeedResponse>(`/api/v1/videos?${qs}`).then((body) => body.items);
}

export function fetchVideo(id: number): Promise<Video> {
  return request<Video>(`/api/v1/videos/${id}`);
}

export function likeVideo(id: number): Promise<Video> {
  return request<Video>(`/api/v1/videos/${id}/like`, { method: "POST" });
}

export function checkHealth(): Promise<{ status: string }> {
  return request<{ status: string }>("/api/v1/health");
}
