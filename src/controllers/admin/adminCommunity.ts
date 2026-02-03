import { Request, Response } from "express";
import { CommunityRecommendation } from "../../models";

export async function listFlagged(req: Request, res: Response) {
  const items = await CommunityRecommendation.find({
    reported: true,
  }).lean();

  res.json({ items });
}

export async function remove(req: Request, res: Response) {
  await CommunityRecommendation.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed" });
}
