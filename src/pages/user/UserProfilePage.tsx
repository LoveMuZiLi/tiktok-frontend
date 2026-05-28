import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { FriendProfilePage } from "@/pages/user/FriendProfilePage";
import { fetchUserProfile, fetchVideoFeed, openChat } from "@/shared/api/client";
import { paths } from "@/router/paths";
import type { UserProfile } from "@/shared/types/user";
import type { Video } from "@/shared/types/video";

type FriendState = { name: string; avatar: string };

export function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const state = location.state as FriendState | null;

  const id = Number(userId) || 0;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [works, setWorks] = useState<Video[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchUserProfile(id).then(setProfile).catch(() => setProfile(null));
    fetchVideoFeed({ feed: "user", targetId: id, limit: 30 })
      .then(setWorks)
      .catch(() => setWorks([]));
  }, [id]);

  const friend = {
    id,
    name: profile?.user.nickname ?? state?.name ?? `user_${userId}`,
    avatar:
      profile?.user.avatar ??
      state?.avatar ??
      "https://images.unsplash.com/photo-1676288785587-0d4398fbf38e?w=200&h=200&fit=crop",
  };

  return (
    <div className="absolute inset-0 z-50 bg-black">
      <FriendProfilePage
        friend={friend}
        profile={profile}
        works={works}
        onBack={() => navigate(-1)}
        onMessage={async (f) => {
          try {
            const convId = await openChat(f.id);
            navigate(paths.inboxChat(convId), {
              state: { name: f.name, avatar: f.avatar },
            });
          } catch {
            navigate(paths.inbox, {
              state: { name: f.name, avatar: f.avatar },
            });
          }
        }}
      />
    </div>
  );
}
