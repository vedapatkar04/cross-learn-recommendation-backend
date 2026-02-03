import mongoose from "mongoose";
import { Interaction } from "../../models";
import { queueRecomputeRecommendations } from "../../jobs/recommendation.queue";

interface UpsertInteractionInput {
  userId: string;
  contentId: string;
  action: number;
  rating?: number;
  type: number;
}

export async function upsertInteraction(input: UpsertInteractionInput) {
  const interaction = await Interaction.findOneAndUpdate(
    {
      userId: new mongoose.Types.ObjectId(input.userId),
      contentId: new mongoose.Types.ObjectId(input.contentId),
    },
    {
      $set: {
        action: input.action,
        type: input.type,
        ...(input.rating ? { rating: input.rating } : {}),
      },
    },
    {
      upsert: true,
      new: true,
    }
  ).lean();

  await queueRecomputeRecommendations(input.userId);

  return interaction;
}

export async function getUserInteractions(userId: string) {
  return Interaction.find({ userId })
    .select("contentId action rating type dCreatedAt")
    .sort({ dCreatedAt: -1 })
    .lean();
}
