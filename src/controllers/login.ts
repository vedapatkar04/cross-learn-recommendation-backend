import { Request as req, Response as res } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function login(req: req, res: res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    //if user exist
    const existing_user = await User.findOne({ email: email }).lean();
    if (!existing_user)
      return res.status(400).json({ message: "Invalid credentials" });

    // Password match
    const password_match = await bcrypt.compare(
      password,
      existing_user.password,
    );
    if (!password_match)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { userId: existing_user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    res.json({
      message: "Login successfull",
      responseMsg: {
        userId: existing_user._id,
        email: existing_user.email,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { login };
