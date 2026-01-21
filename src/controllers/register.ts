import { Request as req, Response as res } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function register(req: req, res: res) {
  try {
    const {email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    //if user exist
    const existing_user = await User.findOne({ email: email }).lean();
    if (existing_user)
      return res.status(400).json({ message: "User Already Exist" });

    // Password match
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

     const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    res.json({
      message: "Registered successful",
      responseMsg: {
        userId: user._id,
        email: email,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { register };
