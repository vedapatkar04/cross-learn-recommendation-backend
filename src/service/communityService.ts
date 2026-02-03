import mongoose from "mongoose";
import { getCache, setCache, deleteCache } from "../util/cache";
import { CommunityRecommendation } from "../models";

export async function createCommunityRecommendation(data: {
  userId: string;
  fromContentId: string;
  toContentId: string;
  reason: string;
}) {
    await deleteCache(`community:${data.fromContentId}`);
  return CommunityRecommendation.create({
    userId: new mongoose.Types.ObjectId(data.userId),
    fromContentId: new mongoose.Types.ObjectId(data.fromContentId),
    toContentId: new mongoose.Types.ObjectId(data.toContentId),
    reason: data.reason,
    upvotes: 0,
  });
}

export async function upvoteCommunityRecommendation(
  recommendationId: string,
  fromContentId: string,
) {
  await deleteCache(`community:${fromContentId}`);

  return CommunityRecommendation.findByIdAndUpdate(
    recommendationId,
    { $inc: { upvotes: 1 } },
    { new: true },
  );
}

export async function getRecommendationsByContent(fromContentId: string) {
  const cacheKey = `community:${fromContentId}`;

  const cached = await getCache<any[]>(cacheKey);
  if (cached) return cached;

  const recommendations = await CommunityRecommendation.find({
    fromContentId,
  })
    .populate("toContentId", "title type")
    .sort({ upvotes: -1 })
    .lean();

  await setCache(cacheKey, recommendations, 600);
  return recommendations;
}
