"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertInteraction = upsertInteraction;
exports.getUserInteractions = getUserInteractions;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../../models");
const recommendation_job_1 = require("../../jobs/recommendation.job");
async function upsertInteraction(input) {
    const interaction = await models_1.Interaction.findOneAndUpdate({
        userId: new mongoose_1.default.Types.ObjectId(input.userId),
        contentId: new mongoose_1.default.Types.ObjectId(input.contentId),
    }, {
        $set: {
            action: input.action,
            type: input.type,
            ...(input.rating ? { rating: input.rating } : {}),
        },
    }, {
        upsert: true,
        new: true,
    }).lean();
    await (0, recommendation_job_1.queueRecomputeRecommendations)(input.userId);
    return interaction;
}
async function getUserInteractions(userId) {
    return models_1.Interaction.find({ userId })
        .select("contentId action rating type dCreatedAt")
        .sort({ dCreatedAt: -1 })
        .lean();
}
