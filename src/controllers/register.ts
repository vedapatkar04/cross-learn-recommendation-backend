import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
import { isValidRequest as uservalidator } from "../validator/login_validdator";
import generateTokenAndSetCookie from "../util/generateToken";

async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const { error, info } = await uservalidator(req.body);
    if (error)
      return res
        .status(400)
        .json({ info, message: "Email and password required" });

    // Check if user exists
    const existing_user = await User.findOne({ email }).lean();
    if (existing_user)
      return res.status(400).json({ message: "User Already Exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // ✅ Set JWT in HTTP-only cookie
    generateTokenAndSetCookie(user._id.toString(), res);

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { register };
