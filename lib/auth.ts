import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Type definitions
export interface AuthenticatedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

export function validateRoute(handler: any) {
  return async (req: NextApiRequest) => {
    const tokenCookieName = process.env.ACCESS_TOKEN || "access_token";
    const token: string = req.cookies[tokenCookieName] || "";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "TEST_TOKEN",
      ) as JWTPayload;
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        console.log(" data not found  => ", user);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return handler(req, user);
    } catch (error) {
      console.error("JWT verification error:", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}

// New validateUser function for App Router
export async function validateUser(
  request: NextRequest,
): Promise<AuthenticatedUser | null> {
  try {
    // Get token from cookies
    const token = request.cookies.get(
      process.env.ACCESS_TOKEN || "testToken",
    )?.value;

    if (!token) {
      return null;
    }

    // Verify JWT token with proper error handling
    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback-secret",
      ) as JWTPayload;
    } catch (jwtError: any) {
      console.error("JWT verification failed:", jwtError.message);
      return null;
    }

    if (!decoded || !decoded.id) {
      console.error("Invalid JWT payload: missing user ID");
      return null;
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      console.error("User not found in database for ID:", decoded.id);
      return null;
    }

    return user;
  } catch (error: any) {
    console.error("Token validation error:", error.message);
    return null;
  }
}

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const user = await validateUser(request);
  return user !== null;
}

export async function getUserIdFromToken(
  request: NextRequest,
): Promise<number | null> {
  try {
    const token = request.cookies.get(
      process.env.ACCESS_TOKEN || "testToken",
    )?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret",
    ) as JWTPayload;

    return decoded?.id || null;
  } catch (error: any) {
    console.error("Failed to extract user ID from token:", error.message);
    return null;
  }
}

// Middleware helper for protecting routes
export function requireAuth(
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<Response>,
) {
  return async (request: NextRequest) => {
    const user = await validateUser(request);

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return handler(request, user);
  };
}

// Utility function to handle JWT errors more gracefully
export function handleJWTError(error: any): string {
  if (error.name === "TokenExpiredError") {
    return "Token has expired";
  } else if (error.name === "JsonWebTokenError") {
    return "Invalid token";
  } else if (error.name === "NotBeforeError") {
    return "Token not active yet";
  } else {
    return "Token verification failed";
  }
}

// Enhanced version with better error messages
export async function validateUserWithErrorDetails(
  request: NextRequest,
): Promise<{ user: AuthenticatedUser | null; error: string | null }> {
  try {
    const token = request.cookies.get(
      process.env.ACCESS_TOKEN || "testToken",
    )?.value;

    if (!token) {
      return { user: null, error: "No authentication token found" };
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback-secret",
      ) as JWTPayload;
    } catch (jwtError: any) {
      return { user: null, error: handleJWTError(jwtError) };
    }

    if (!decoded || !decoded.id) {
      return { user: null, error: "Invalid token payload" };
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return { user: null, error: "User not found" };
    }

    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: `Authentication error: ${error.message}` };
  }
}
