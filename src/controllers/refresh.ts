import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../util/generateToken";

async function refresh(req: Request, res: Response) {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    generateTokenAndSetCookie(decoded.userId, res);

    res.json({
      message: "Token refreshed",
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export { refresh };
