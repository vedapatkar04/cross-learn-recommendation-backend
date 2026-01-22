"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityRecommendation = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    fromContentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "MasterContent",
        required: true,
    },
    toContentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "MasterContent",
        required: true,
    },
    reason: { type: String, required: false, default: "" },
    upvotes: { type: Number, default: 0 },
}, { timestamps: true });
const CommunityRecommendation = (0, mongoose_1.model)("CommunityRecommendation", schema, "CommunityRecommendation");
exports.CommunityRecommendation = CommunityRecommendation;
