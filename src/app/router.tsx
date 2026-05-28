import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./layouts/AppLayout";
import { HomePage } from "./pages/HomePage";
import { FriendProfileRoute } from "./pages/FriendProfileRoute";
import { FriendsPage } from "./components/FriendsPage";
import { MessagesPage } from "./components/MessagesPage";
import { ProfilePage } from "./components/ProfilePage";
import { UploadPage } from "./components/UploadPage";
import { paths } from "./routes/paths";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "friends", element: <FriendsPage /> },
      { path: "inbox", element: <MessagesPage /> },
      { path: "inbox/:chatId", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "user/:userId", element: <FriendProfileRoute /> },
    ],
  },
  { path: "*", element: <Navigate to={paths.home} replace /> },
]);
