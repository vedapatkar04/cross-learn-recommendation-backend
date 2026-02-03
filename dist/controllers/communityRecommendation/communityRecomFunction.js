"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.upvote = upvote;
exports.list = list;
exports.getMyRecommendations = getMyRecommendations;
const communityService_1 = require("../../service/communityService");
const models_1 = require("../../models");
const cache_1 = require("../../util/cache");
async function create(req, res) {
    try {
        const { fromContentId, toContentId, reason } = req.body;
        const recommendation = await (0, communityService_1.createCommunityRecommendation)({
            userId: req.user.userId,
            fromContentId,
            toContentId,
            reason,
        });
        res.status(201).json({ recommendation });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create recommendation" });
    }
}
async function upvote(req, res) {
    try {
        const updated = await (0, communityService_1.upvoteCommunityRecommendation)(req.params.id, req.body.fromContentId);
        res.json({ updated });
    }
    catch {
        res.status(500).json({ message: "Upvote failed" });
    }
}
async function list(req, res) {
    try {
        const recommendations = await (0, communityService_1.getRecommendationsByContent)(req.params.contentId);
        res.json({ recommendations });
    }
    catch {
        res.status(500).json({ message: "Fetch failed" });
    }
}
async function getMyRecommendations(req, res) {
    const userId = req.user.userId;
    const cached = await (0, cache_1.getCache)(`recommendations:${userId}`);
    if (cached)
        return res.json({ data: cached });
    const data = await models_1.UserRecommendation.find({ userId }).lean();
    res.json({ data });
}
