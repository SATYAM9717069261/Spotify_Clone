import jwt from "jsonwebtoken";

import type { User } from "./types";

const EXPIRE_TIME = "12h";
function getToken(user: User): string {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    process.env.JWT_SECRET || "fallback-secret",
    {
      expiresIn: EXPIRE_TIME,
    },
  );
}

export { getToken };
