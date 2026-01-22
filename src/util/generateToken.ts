import { Response } from "express";
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (
  userId: string,
  res: Response
): string => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true,                 // prevents XSS
    sameSite: "strict",              // CSRF protection
    secure: process.env.NODE_ENV === "development",
  });

  return token; // optional, useful for testing
};

export default generateTokenAndSetCookie;
