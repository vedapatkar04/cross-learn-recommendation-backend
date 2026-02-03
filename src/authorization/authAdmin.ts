import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export function adminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user || req.body.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
