"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRecommendation = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, index: true },
    contentId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    score: { type: Number, default: 0 },
}, { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } });
const UserRecommendation = (0, mongoose_1.model)("UserRecommendation", schema, "UserRecommendation");
exports.UserRecommendation = UserRecommendation;
