"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommunityRecommendation = createCommunityRecommendation;
exports.upvoteCommunityRecommendation = upvoteCommunityRecommendation;
exports.getRecommendationsByContent = getRecommendationsByContent;
const mongoose_1 = __importDefault(require("mongoose"));
const cache_1 = require("../util/cache");
const models_1 = require("../models");
async function createCommunityRecommendation(data) {
    await (0, cache_1.deleteCache)(`community:${data.fromContentId}`);
    return models_1.CommunityRecommendation.create({
        userId: new mongoose_1.default.Types.ObjectId(data.userId),
        fromContentId: new mongoose_1.default.Types.ObjectId(data.fromContentId),
        toContentId: new mongoose_1.default.Types.ObjectId(data.toContentId),
        reason: data.reason,
        upvotes: 0,
    });
}
async function upvoteCommunityRecommendation(recommendationId, fromContentId) {
    await (0, cache_1.deleteCache)(`community:${fromContentId}`);
    return models_1.CommunityRecommendation.findByIdAndUpdate(recommendationId, { $inc: { upvotes: 1 } }, { new: true });
}
async function getRecommendationsByContent(fromContentId) {
    const cacheKey = `community:${fromContentId}`;
    const cached = await (0, cache_1.getCache)(cacheKey);
    if (cached)
        return cached;
    const recommendations = await models_1.CommunityRecommendation.find({
        fromContentId,
    })
        .populate("toContentId", "title type")
        .sort({ upvotes: -1 })
        .lean();
    await (0, cache_1.setCache)(cacheKey, recommendations, 600);
    return recommendations;
}
