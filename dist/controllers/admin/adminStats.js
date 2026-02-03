"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overview = overview;
const models_1 = require("../../models");
async function overview(req, res) {
    const [users, contents, interactions] = await Promise.all([
        models_1.User.countDocuments(),
        models_1.MasterContent.countDocuments(),
        models_1.Interaction.countDocuments(),
    ]);
    res.json({
        users,
        contents,
        interactions,
    });
}
