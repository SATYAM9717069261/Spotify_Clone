import { requireAuth } from "@libs/auth";
import search from "@libs/search";
import { NextRequest, NextResponse } from "next/server";

export const GET = requireAuth(async (request: NextRequest, user) => {
  const paramsObject = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );

  const results = await search(paramsObject);

  return NextResponse.json({ results });
});
