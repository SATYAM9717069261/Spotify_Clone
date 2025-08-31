import { NextRequest, NextResponse } from "next/server";
import prisma from "@libs/prisma";
import { validateRoute } from "@libs/auth";

export const GET = validateRoute(async (req: NextRequest, user: any) => {
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
