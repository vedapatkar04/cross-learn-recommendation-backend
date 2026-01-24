"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const models_1 = require("../../models");
async function updateProfile(req, res) {
    try {
        const user = await models_1.User.findOne({ _id: req.user.userId }).lean();
        if (!user)
            return res.status(404).json({ message: "User Not Found" });
        const updates = {
            $set: { ...req.body },
        };
        await models_1.User.updateOne({ _id: user._id }, updates, {
            new: true,
            upsert: true,
            runValidators: true,
        });
        res.json({
            message: "Updated successfull",
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
exports.updateProfile = updateProfile;
