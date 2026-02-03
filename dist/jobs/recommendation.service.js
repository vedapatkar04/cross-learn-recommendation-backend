"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recomputeUserRecommendations = recomputeUserRecommendations;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const models_2 = require("../models");
const cache_1 = require("../util/cache");
async function recomputeUserRecommendations(userId) {
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    const interactions = await models_1.Interaction.find({ userId: userObjectId })
        .select("contentId action rating")
        .lean();
    if (!interactions.length) {
        await (0, cache_1.deleteCache)(`recommendations:${userId}`);
        return;
    }
    const contentIds = interactions.map((i) => i.contentId);
    const relatedContent = await models_1.MasterContent.find({
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
    await models_2.UserRecommendation.deleteMany({ userId: userObjectId });
    if (recommendations.length) {
        await models_2.UserRecommendation.insertMany(recommendations);
    }
    await (0, cache_1.setCache)(`recommendations:${userId}`, recommendations, 3600);
}
