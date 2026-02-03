import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const recommendationQueue = new Queue(
  "recommendation-recompute",
  { connection: redisConnection }
);

export async function queueRecomputeRecommendations(userId: string) {
  await recommendationQueue.add(
    "recompute",
    { userId },
    {
      removeOnComplete: true,
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    },
  );
}
