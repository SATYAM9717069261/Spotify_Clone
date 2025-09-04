import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@libs/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await validateUser(request);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized", authenticated: false },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Authenticated",
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error: any) {
    console.error("Route validation error:", error);
    return NextResponse.json(
      { message: "Authentication failed", authenticated: false },
      { status: 500 },
    );
  }
}
