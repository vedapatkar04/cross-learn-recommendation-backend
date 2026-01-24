import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development",
  });

  res.json({ message: "Logout successful" });
};

