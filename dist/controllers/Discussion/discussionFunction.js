"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.like = like;
exports.list = list;
exports.remove = remove;
const discussionService_1 = require("../../service/discussionService");
async function create(req, res) {
    try {
        const { contentId, title, body } = req.body;
        const discussion = await (0, discussionService_1.createDiscussion)({
            userId: req.user.userId,
            contentId,
            title,
            body,
        });
        res.status(201).json({ discussion });
    }
    catch {
        res.status(500).json({ message: "Create discussion failed" });
    }
}
async function like(req, res) {
    const updated = await (0, discussionService_1.likeDiscussion)(req.params.id, req.params.contentId);
    res.json({ updated });
}
async function list(req, res) {
    const discussions = await (0, discussionService_1.getDiscussionsByContent)(req.params.contentId);
    res.json({ discussions });
}
async function remove(req, res) {
    await (0, discussionService_1.softDeleteDiscussion)(req.params.id, req.params.contentId);
    res.json({ message: "Discussion removed" });
}
