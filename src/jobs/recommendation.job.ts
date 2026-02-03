import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const recommendationQueue = new Queue("recommendation-recompute", {
  connection: redisConnection,
});

export async function queueRecomputeRecommendations(userId: string) {
  await recommendationQueue.add(
    "recompute-user-recommendations",
    { userId },
    {
      removeOnComplete: true,
      removeOnFail: true,
    },
  );
}
