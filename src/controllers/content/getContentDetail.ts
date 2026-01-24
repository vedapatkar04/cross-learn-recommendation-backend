import { MasterContent, Interaction, action } from "../../models";
import { Request as req, Response as res } from "express";

async function getContentDetails(req: req, res: res) {
  try {
    const [content, user_content] = await Promise.all([
      MasterContent.findOne(
        { _id: req.body.contentId },
        { dCreatedAt: 0, dUpdatedAt: 0 },
      ).lean(),
      Interaction.findOne(
        { contentId: req.body.contentId, userId: req.body.userId },
        { action: 1, rating: 1 },
      ).lean(),
    ]);

    if (!content) return res.status(404).json({ message: "Data Not Found" });

    const data = {
      contentId: content._id,
      title: content.title,
      description: content.description,
      action: user_content ? user_content.action : action.view,
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
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export { getContentDetails };
