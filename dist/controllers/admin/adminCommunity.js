"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFlagged = listFlagged;
exports.remove = remove;
const models_1 = require("../../models");
async function listFlagged(req, res) {
    const items = await models_1.CommunityRecommendation.find({
        reported: true,
    }).lean();
    res.json({ items });
}
async function remove(req, res) {
    await models_1.CommunityRecommendation.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
}
