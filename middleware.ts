import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/"];

export function middleware(req: NextRequest) {
  console.log("route URL :", req.nextUrl.pathname);
  if (PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
    console.log("Protected route detected, checking for token");

    const tokenCookieName = process.env.ACCESS_TOKEN || "access_token";
    const token = req.cookies.get(tokenCookieName);

    console.log("Token cookie name:", tokenCookieName);
    console.log("Token found:", !!token);

    if (!token || !token.value) {
      console.log("No token found, redirecting to signin");
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    console.log("Token verified, allowing access");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
