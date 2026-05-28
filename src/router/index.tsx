import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/home/HomePage";
import { UserProfilePage } from "@/pages/user/UserProfilePage";
import { FriendsPage } from "@/pages/friends/FriendsPage";
import { MessagesPage } from "@/pages/inbox/MessagesPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { UploadPage } from "@/pages/upload/UploadPage";
import { paths } from "@/router/paths";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "friends", element: <FriendsPage /> },
      { path: "inbox", element: <MessagesPage /> },
      { path: "inbox/:chatId", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "user/:userId", element: <UserProfilePage /> },
    ],
  },
  { path: "*", element: <Navigate to={paths.home} replace /> },
]);
