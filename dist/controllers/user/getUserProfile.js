"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const models_1 = require("../../models");
async function getUserProfile(req, res) {
    try {
        const user = await models_1.User.findOne({ _id: req.user.userId }, { name: 1, email: 1, skillLevel: 1, interests: 1, learningGoals: 1 }).lean();
        if (!user)
            return res.status(404).json({ message: "User Not Found" });
        res.json({
            responseMsg: {
                profile: user,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
exports.getUserProfile = getUserProfile;
