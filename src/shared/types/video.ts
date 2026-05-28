export interface Video {
  id: number;
  username: string;
  avatar: string;
  description: string;
  music: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface VideoFeedResponse {
  items: Video[];
  total: number;
  offset: number;
  limit: number;
}
