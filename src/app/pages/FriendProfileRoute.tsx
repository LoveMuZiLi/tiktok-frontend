import { useNavigate, useParams, useLocation } from "react-router";
import { FriendProfilePage } from "../components/FriendProfilePage";
import { paths } from "../routes/paths";

type FriendState = { name: string; avatar: string };

export function FriendProfileRoute() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const state = location.state as FriendState | null;

  const id = Number(userId) || 0;
  const friend = {
    id,
    name: state?.name ?? `user_${userId}`,
    avatar:
      state?.avatar ??
      "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=200&h=200&fit=crop",
  };

  return (
    <div className="absolute inset-0 z-50 bg-black">
      <FriendProfilePage
        friend={friend}
        onBack={() => navigate(-1)}
        onMessage={(f) =>
          navigate(paths.inboxChat(0), {
            state: { name: f.name, avatar: f.avatar },
          })
        }
      />
    </div>
  );
}
