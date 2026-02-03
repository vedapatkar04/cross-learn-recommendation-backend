"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const recommendation_service_1 = require("./recommendation.service");
new bullmq_1.Worker("recommendation-recompute", async (job) => {
    const { userId } = job.data;
    await (0, recommendation_service_1.recomputeUserRecommendations)(userId);
}, { connection: redis_1.redisConnection });
