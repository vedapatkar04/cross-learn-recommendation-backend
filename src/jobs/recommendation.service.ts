import mongoose from "mongoose";
import { Interaction, MasterContent } from "../models";
import { UserRecommendation } from "../models";
import { setCache, deleteCache } from "../util/cache";

export async function recomputeUserRecommendations(userId: string) {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const interactions = await Interaction.find({ userId: userObjectId })
    .select("contentId action rating")
    .lean();

  if (!interactions.length) {
    await deleteCache(`recommendations:${userId}`);
    return;
  }


  const contentIds = interactions.map((i) => i.contentId);

  const relatedContent = await MasterContent.find({
    _id: { $nin: contentIds },
  })
    .sort({ popularityScore: -1, avgRating: -1 })
    .limit(20)
    .lean();


  const recommendations = relatedContent.map((content, index) => ({
    userId: userObjectId,
    contentId: content._id,
    score: 100 - index,
  }));


  await UserRecommendation.deleteMany({ userId: userObjectId });

  if (recommendations.length) {
    await UserRecommendation.insertMany(recommendations);
  }


  await setCache(
    `recommendations:${userId}`,
    recommendations,
    3600, // 1 hour
  );
}
