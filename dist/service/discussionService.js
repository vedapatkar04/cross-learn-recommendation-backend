"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscussion = createDiscussion;
exports.likeDiscussion = likeDiscussion;
exports.getDiscussionsByContent = getDiscussionsByContent;
exports.softDeleteDiscussion = softDeleteDiscussion;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const cache_1 = require("../util/cache");
async function createDiscussion(data) {
    await (0, cache_1.deleteCache)(`discussions:${data.contentId}`);
    return models_1.Discussion.create({
        userId: new mongoose_1.default.Types.ObjectId(data.userId),
        contentId: new mongoose_1.default.Types.ObjectId(data.contentId),
        title: data.title,
        body: data.body,
        likes: 0,
        isDeleted: false,
    });
}
async function likeDiscussion(id, contentId) {
    const updated = await models_1.Discussion.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    await (0, cache_1.deleteCache)(`discussions:${contentId}`);
    return updated;
}
async function getDiscussionsByContent(contentId) {
    const cacheKey = `discussions:${contentId}`;
    const cached = await (0, cache_1.getCache)(cacheKey);
    if (cached)
        return cached;
    const discussions = await models_1.Discussion.find({
        contentId,
        isDeleted: false,
    })
        .populate("userId", "name")
        .sort({ dCreatedAt: -1 })
        .lean();
    await (0, cache_1.setCache)(cacheKey, discussions, 600); // 10 min
    return discussions;
}
async function softDeleteDiscussion(discussionId, contentId) {
    await (0, cache_1.deleteCache)(`discussions:${contentId}`);
    return models_1.Discussion.findByIdAndUpdate(discussionId, { isDeleted: true }, { new: true });
}
