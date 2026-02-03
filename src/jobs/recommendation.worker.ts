import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { recomputeUserRecommendations } from "./recommendation.service";

new Worker(
  "recommendation-recompute",
  async (job) => {
    await recomputeUserRecommendations(job.data.userId);
  },
  { connection: redisConnection },
);
