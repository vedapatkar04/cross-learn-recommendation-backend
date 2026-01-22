"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterContent = void 0;
const mongoose_1 = require("mongoose");
var types;
(function (types) {
    types[types["course"] = 1] = "course";
    types[types["book"] = 2] = "book";
})(types || (types = {}));
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String, required: false, default: [] }],
    topics: [{ type: String, required: false, default: [] }],
    difficulty: { type: String, required: false, default: "" },
    duration: { type: Number, required: false, default: 0 },
    readingTime: { type: Number, required: false, default: 0 },
    instructor: { type: String, required: false, default: "" },
    author: { type: String, required: false, default: "" },
    type: {
        type: Number,
        enum: types,
        required: true,
        default: types.course,
    },
    popularityScore: { type: Number, required: false, default: 0 },
    avgRating: { type: Number, required: false, default: 0 },
}, {
    timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" },
});
const MasterContent = (0, mongoose_1.model)("MasterContent", schema, "MasterContent");
exports.MasterContent = MasterContent;
