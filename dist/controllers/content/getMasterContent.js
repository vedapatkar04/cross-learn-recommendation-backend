"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMasterContent = void 0;
const models_1 = require("../../models");
async function getMasterContent(req, res) {
    try {
        const master_content = await models_1.MasterContent.find({}, { dCreatedAt: 0, dUpdatedAt: 0 }).lean();
        if (!master_content)
            return res.status(404).json({ message: "Data Not Found" });
        res.json({
            responseMsg: {
                master_content: master_content,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
exports.getMasterContent = getMasterContent;
