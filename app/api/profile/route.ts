import { NextRequest, NextResponse } from "next/server";
import prisma from "@libs/prisma";
import { requireAuth } from "@libs/auth";

export const GET = requireAuth(async (request: NextRequest, user) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({ ...user, playlistsCount });
});
