export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  douyinId: string;
  bio: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  user: User;
  followingCount: number;
  followerCount: number;
  totalLikes: number;
  videoCount: number;
}
