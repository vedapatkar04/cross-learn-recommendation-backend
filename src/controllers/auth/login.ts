import { Request as req, Response as res } from "express";
import { User } from "../../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../util/generateToken";
import { isValidRequest as uservalidator } from "../../validator/login_validdator";

async function login(req: req, res: res) {
  try {
    const { email, password } = req.body;

    const { error, info } = await uservalidator(req.body);
    if (error)
      return res
        .status(400)
        .json({ info, message: "Email and password required" });

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

    generateTokenAndSetCookie(existing_user._id.toString(), res);
    res.json({
      message: "Login successfull",
      responseMsg: {
        userId: existing_user._id,
        email: existing_user.email,
       },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { login };
