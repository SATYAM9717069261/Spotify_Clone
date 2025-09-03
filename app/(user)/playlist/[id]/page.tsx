import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import prisma from "@libs/prisma";

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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">{playlist.name}</h1>
        <p className="text-gray-300">
          {playlist.songs.length} song{playlist.songs.length !== 1 ? "s" : ""}
        </p>
        <p className="text-sm text-gray-400">User ID: {user.id}</p>
      </div>

      <div className="space-y-2">
        {playlist.songs.map((song, index) => (
          <div
            key={song.id}
            className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded"
          >
            <span className="text-gray-400 w-6">{index + 1}</span>
            <div className="flex-1">
              <p className="text-white font-medium">{song.name}</p>
              <p className="text-gray-400 text-sm">{song.artist.name}</p>
            </div>
            <span className="text-gray-400 text-sm">{song.duration}</span>
          </div>
        ))}
      </div>

      {playlist.songs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No songs in this playlist</p>
        </div>
      )}
    </div>
  );
}
