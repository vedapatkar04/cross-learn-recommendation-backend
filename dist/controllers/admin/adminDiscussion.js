"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReported = listReported;
exports.softDelete = softDelete;
const models_1 = require("../../models");
async function listReported(req, res) {
    const discussions = await models_1.Discussion.find({
        reported: true,
        isDeleted: false,
    }).lean();
    res.json({ discussions });
}
async function softDelete(req, res) {
    await models_1.Discussion.findByIdAndUpdate(req.params.id, {
        isDeleted: true,
    });
    res.json({ message: "Discussion removed" });
}
