export interface Chat {
  id: number;
  peerId: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread: number;
  hasCamera?: boolean;
}

export interface Message {
  id: number;
  text: string;
  isMine: boolean;
  time: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt?: string;
}
