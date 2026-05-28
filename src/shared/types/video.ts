export interface Video {
  id: number;
  userId: number;
  username: string;
  avatar: string;
  description: string;
  music: string;
  image: string;
  likes: number;
  favorites?: number;
  comments: number;
  shares: number;
  videoUrl?: string;
}

export interface InteractionStatus {
  liked: boolean;
  favorited: boolean;
}

export interface VideoComment {
  id: number;
  userId: number;
  videoId: number;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface VideoFeedResponse {
  items: Video[];
  total: number;
  offset: number;
  limit: number;
}
