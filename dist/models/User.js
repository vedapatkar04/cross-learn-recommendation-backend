"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
var levels;
(function (levels) {
    levels[levels["beginner"] = 1] = "beginner";
    levels[levels["intermediate"] = 2] = "intermediate";
    levels[levels["advanced"] = 3] = "advanced";
})(levels || (levels = {}));
const schema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false, default: "" },
    socketId: { type: String, required: false, default: "" },
    isAdmin: { type: Boolean, required: false, default: false },
    skillLevel: {
        type: Number,
        enum: levels,
        required: false,
        default: levels.beginner,
    },
    interests: [{ type: String, required: false, default: [] }],
    learningGoals: [{ type: String, required: false, default: [] }],
}, {
    timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" },
});
schema.index({ email: 1 });
const User = (0, mongoose_1.model)("User", schema, "User");
exports.User = User;
