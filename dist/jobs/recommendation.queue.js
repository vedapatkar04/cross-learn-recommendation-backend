"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationQueue = void 0;
exports.queueRecomputeRecommendations = queueRecomputeRecommendations;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
exports.recommendationQueue = new bullmq_1.Queue("recommendation-recompute", { connection: redis_1.redisConnection });
async function queueRecomputeRecommendations(userId) {
    await exports.recommendationQueue.add("recompute", { userId }, {
        removeOnComplete: true,
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
    });
}
