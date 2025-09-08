import { requireAuth } from "@libs/auth";
import prisma from "@libs/prisma";
import search from "@libs/search";
import { NextRequest, NextResponse } from "next/server";

export const GET = requireAuth(async (request: NextRequest, user) => {
  const paramsObject = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );

  const results = await search(paramsObject);

  const playlistsCount = await prisma.playlist.count({
    where: { userId: user.id },
  });

  return NextResponse.json({ user, playlistsCount, results });
});
