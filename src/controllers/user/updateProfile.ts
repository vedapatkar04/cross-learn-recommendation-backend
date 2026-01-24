import { Request as req, Response as res } from "express";
import { User } from "../../models";
import { AuthRequest } from "../../authorization/auth";

async function updateProfile(req: AuthRequest, res: res) {
  try {
    const user = await User.findOne({ _id: req.user!.userId }).lean();

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const updates = {
      $set: { ...req.body },
    };
    await User.updateOne({ _id: user._id }, updates, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    res.json({
      message: "Updated successfull",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export { updateProfile };
