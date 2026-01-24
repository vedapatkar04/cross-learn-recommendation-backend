"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.Interaction = void 0;
const mongoose_1 = require("mongoose");
var action;
(function (action) {
    action[action["view"] = 1] = "view";
    action[action["enroll"] = 2] = "enroll";
    action[action["startReading"] = 3] = "startReading";
    action[action["complete"] = 4] = "complete";
    action[action["rate"] = 5] = "rate";
    action[action["bookmark"] = 6] = "bookmark";
})(action || (exports.action = action = {}));
var types;
(function (types) {
    types[types["course"] = 1] = "course";
    types[types["book"] = 2] = "book";
})(types || (types = {}));
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "MasterContent", required: true },
    action: {
        type: Number,
        enum: action,
        required: true,
    },
    rating: { type: Number, min: 1, max: 5 },
    type: { type: Number, enum: types, required: false, default: types.course },
}, { timestamps: true });
const Interaction = (0, mongoose_1.model)("Interaction", schema, "Interaction");
exports.Interaction = Interaction;
