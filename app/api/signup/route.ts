import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import PrismaClient from "@libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Email, password, and name are required" },
        { status: 400 },
      );
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in database
    const user = await PrismaClient.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      process.env.JWT_SECRET || "fallback-secret",
      {
        expiresIn: "12h",
      },
    );

    // Create response with user data (excluding password)
    const response = NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    );

    // Set cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12, // 12 hours
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle unique constraint violation (email already exists)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Signup failed", error: error.message },
      { status: 500 },
    );
  }
}
