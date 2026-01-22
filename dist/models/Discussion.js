"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discussion = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "MasterContent", required: true },
    title: { type: String, required: false, default: "" },
    body: { type: String, required: false, default: "" },
    likes: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const Discussion = (0, mongoose_1.model)("Discussion", schema, "Discussion");
exports.Discussion = Discussion;
