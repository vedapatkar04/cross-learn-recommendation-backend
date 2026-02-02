import { MasterContent, action } from "../../models";
import { AuthRequest } from "../../authorization/auth";
import mongoose from "mongoose";
import { M } from "../../config/db";
import { Request as req, Response as res } from "express";

export async function getMasterContent(req: req, res: res) {
  try {
    const master_content = await MasterContent.find(
      { },
      { dCreatedAt: 0, dUpdatedAt: 0 },
    ).lean();

    if (!master_content) return res.status(404).json({ message: "Data Not Found" });

    res.json({
      responseMsg: {
        master_content: master_content,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


// id
export async function getContentDetails(req: AuthRequest, res: res) {
  try {
    const contentId = req.params.id;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid content id" });
    }

    const pipeline: any[] = [
      {
        $match: {
          _id: M.mongify(contentId),
        },
      },

      {
        $lookup: {
          from: "Interaction", 
          let: { contentId: "$_id", userId: userId ? M.mongify(userId) : null },
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
            $ifNull: ["$interaction.action", action.view],
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
    const [result] = await MasterContent.aggregate(pipeline);

    if (!result) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
      message: "Success",
      responseMsg: {
        data: result
      }
    });
  } catch (error) {
    console.error("getContentDetails error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
