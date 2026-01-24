import { Request as req, Response as res } from "express";
import { User } from "../models";
import { AuthRequest } from "../authorization/auth";

async function getUserProfile(req: AuthRequest, res: res) {
  try {
    const user = await User.findOne({ _id: req.user!.userId },{name: 1, email: 1, skillLevel: 1, interests: 1, learningGoals: 1}).lean();

    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.json({
     responseMsg: {
        profile: user
        },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export { getUserProfile };
