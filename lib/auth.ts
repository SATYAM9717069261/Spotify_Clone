import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";

export function validateRoute(handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[`${process.env.ACCESS_TOKEN}`];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      return handler(req, res, user);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
