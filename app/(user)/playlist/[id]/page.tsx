import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import prisma from "@libs/prisma";
import GradientLayout from "@components/Layout/gradientLayout";
import SongTable from "@components/UserContainer/songtable";

interface JWTPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

const getBGColor = (id: string) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return (
    colors[parseInt(id) - 1] ||
    colors[Math.floor(Math.random() * colors.length)]
  );
};

async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(
      process.env.ACCESS_TOKEN || "testToken",
    )?.value;
    console.log(" toekn Get  +> ", token);
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret",
    ) as JWTPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
}

async function getPlaylist(playlistId: number, userId: number) {
  try {
    const [playlist] = await prisma.playlist.findMany({
      where: {
        id: playlistId,
        userId: userId,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return playlist;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return null;
  }
}

export default async function Playlist({ params }: { params: { id: string } }) {
  console.log("params => ", params);

  const user = await getUserFromToken();
  if (!user) {
    redirect("/signin");
  }

  // Get playlist data
  const playlist = await getPlaylist(Number(params.id), user.id);

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white text-xl">Playlist not found</p>
      </div>
    );
  }

  const color = getBGColor(params.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
}
