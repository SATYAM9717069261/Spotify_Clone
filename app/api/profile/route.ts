import { NextRequest, NextResponse } from "next/server";
import prisma from "@libs/prisma";
import { validateRoute } from "@libs/auth";

export const GET = validateRoute(async (req: NextRequest, user: any) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({ ...user, playlistsCount });
});
