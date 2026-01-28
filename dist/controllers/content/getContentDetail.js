"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentDetails = getContentDetails;
const models_1 = require("../../models");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../../config/db");
async function getContentDetails(req, res) {
    try {
        const contentId = req.params.id;
        const userId = req.user?.userId;
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return res.status(400).json({ message: "Invalid content id" });
        }
        const pipeline = [
            {
                $match: {
                    _id: db_1.M.mongify(contentId),
                },
            },
            {
                $lookup: {
                    from: "Interaction",
                    let: { contentId: "$_id", userId: userId ? db_1.M.mongify(userId) : null },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$contentId", "$$contentId"] },
                                        { $eq: ["$userId", "$$userId"] },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                action: 1,
                                rating: 1,
                                _id: 0,
                            },
                        },
                    ],
                    as: "interaction",
                },
            },
            {
                $unwind: {
                    path: "$interaction",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    userAction: {
                        $ifNull: ["$interaction.action", models_1.action.view],
                    },
                    userRating: {
                        $ifNull: ["$interaction.rating", 0],
                    },
                },
            },
            {
                $project: {
                    interaction: 0,
                    dCreatedAt: 0,
                    dUpdatedAt: 0,
                    __v: 0,
                },
            },
        ];
        const [result] = await models_1.MasterContent.aggregate(pipeline);
        if (!result) {
            return res.status(404).json({ message: "Content not found" });
        }
        return res.status(200).json({
            message: "Success",
            responseMsg: {
                data: result
            }
        });
    }
    catch (error) {
        console.error("getContentDetails error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
