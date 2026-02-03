import { Request, Response } from "express";
import {
  createCommunityRecommendation,
  upvoteCommunityRecommendation,
  getRecommendationsByContent,
} from "../../service/communityService";
import { AuthRequest } from "../../authorization/auth";
import { UserRecommendation } from "../../models";
import { getCache } from "../../util/cache";

export async function create(req: AuthRequest, res: Response) {
  try {
    const { fromContentId, toContentId, reason } = req.body;

    const recommendation = await createCommunityRecommendation({
      userId: req.user!.userId,
      fromContentId,
      toContentId,
      reason,
    });

    res.status(201).json({ recommendation });
  } catch (err) {
    res.status(500).json({ message: "Failed to create recommendation" });
  }
}

export async function upvote(req: Request, res: Response) {
  try {
    const updated = await upvoteCommunityRecommendation(
      req.params.id,
      req.body.fromContentId,
    );
    res.json({ updated });
  } catch {
    res.status(500).json({ message: "Upvote failed" });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const recommendations = await getRecommendationsByContent(
      req.params.contentId,
    );
    res.json({ recommendations });
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
}

export async function getMyRecommendations(req: AuthRequest, res: Response) {
  const userId = req.user!.userId;

  const cached = await getCache(`recommendations:${userId}`);
  if (cached) return res.json({ data: cached });

  const data = await UserRecommendation.find({ userId }).lean();
  res.json({ data });
}
