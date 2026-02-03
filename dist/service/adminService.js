"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContent = createContent;
exports.updateContent = updateContent;
exports.softDeleteContent = softDeleteContent;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("..//models");
function createContent(data) {
    return models_1.MasterContent.create(data);
}
function updateContent(id, data) {
    return models_1.MasterContent.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(id), data, { new: true });
}
function softDeleteContent(id) {
    return models_1.MasterContent.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}
