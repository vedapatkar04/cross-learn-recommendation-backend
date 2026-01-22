"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const models_1 = require("../models");
async function updateProfile(req, res) {
    try {
        const user = await models_1.User.findOne({ _id: req.user.userId }).lean();
        if (!user)
            return res.status(206).json({ message: "User Not Found" });
        await models_1.User.updateOne({ _id: user._id }, { $set: { name: req.body.name } });
        res.json({
            message: "Updated successfull",
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
exports.updateProfile = updateProfile;
