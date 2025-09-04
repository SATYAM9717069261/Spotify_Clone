import { NextRequest, NextResponse } from "next/server";
import prisma from "@libs/prisma";
import { requireAuth } from "@libs/auth";

export const GET = requireAuth(async (request: NextRequest, user) => {
  console.log("user Details ", user);
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(playlists);
});
