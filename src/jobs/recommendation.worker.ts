import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { recomputeUserRecommendations } from "./recommendation.service";

new Worker(
  "recommendation-recompute",
  async (job) => {
    const { userId } = job.data;
    await recomputeUserRecommendations(userId);
  },
  { connection: redisConnection },
);
