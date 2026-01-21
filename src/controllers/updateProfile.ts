import { Request as req, Response as res } from "express";
import { User } from "../models";
import { AuthRequest } from "../authorization/auth";

async function updateProfile(req: AuthRequest, res: res) {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();

    if (!user) return res.status(206).json({ message: "User Not Found" });

    await User.updateOne({ _id: user._id }, { $set: { name: req.body.name } });

    res.json({
      message: "Updated successfull",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export { updateProfile };
