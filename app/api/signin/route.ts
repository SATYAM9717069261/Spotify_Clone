import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

import prisma from "@libs/prisma";
import { getToken } from "@libs/tokenGenerate";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const userDetails = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userDetails && bcrypt.compareSync(password, userDetails.password)) {
    const token = getToken(userDetails);
    const response = NextResponse.json(
      {
        message: "Signup successful",
        user: {
          email: userDetails.email,
          name: userDetails.name,
        },
      },
      { status: 201 },
    );

    // Set cookie
    response.cookies.set({
      name: process.env.ACCESS_TOKEN || "testToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12, // 12 hours
      sameSite: "lax",
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 200 },
    );
  }
}
