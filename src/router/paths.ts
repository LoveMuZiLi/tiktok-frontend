export const paths = {
  home: "/",
  friends: "/friends",
  inbox: "/inbox",
  inboxChat: (chatId: string | number) => `/inbox/${chatId}`,
  profile: "/profile",
  upload: "/upload",
  user: (userId: string | number) => `/user/${userId}`,
} as const;

export type TabPath = typeof paths.home | typeof paths.friends | typeof paths.inbox | typeof paths.profile;
