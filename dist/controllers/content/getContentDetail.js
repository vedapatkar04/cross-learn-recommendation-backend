"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentDetails = void 0;
const models_1 = require("../../models");
async function getContentDetails(req, res) {
    try {
        const [content, user_content] = await Promise.all([
            models_1.MasterContent.findOne({ _id: req.body.contentId }, { dCreatedAt: 0, dUpdatedAt: 0 }).lean(),
            models_1.Interaction.findOne({ contentId: req.body.contentId, userId: req.body.userId }, { action: 1, rating: 1 }).lean(),
        ]);
        if (!content)
            return res.status(404).json({ message: "Data Not Found" });
        const data = {
            contentId: content._id,
            title: content.title,
            description: content.description,
            action: user_content ? user_content.action : models_1.action.view,
            rating: user_content ? user_content.rating : 0,
            skills: content.skills, // course
            topics: content.topics, // book
            difficulty: content.difficulty,
            duration: content.duration, // course
            readingTime: content.readingTime, // book
            instructor: content.instructor, // course
            author: content.author, // book
            type: content.type,
            popularityScore: content.popularityScore,
            avgRating: content.avgRating,
        };
        res.json({
            responseMsg: {
                master_content: data,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
exports.getContentDetails = getContentDetails;
