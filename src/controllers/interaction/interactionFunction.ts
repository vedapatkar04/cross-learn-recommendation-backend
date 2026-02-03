import { Request, Response } from "express";
import mongoose from "mongoose";
import { action } from "../../models";
import * as interactionService from "./interactionService";
import { AuthRequest } from "../../authorization/auth";

export async function trackInteraction(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.userId;
    const { contentId, action: userAction, rating, type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid content id" });
    }

    if (!Object.values(action).includes(userAction)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    if (
      userAction === action.rate &&
      (rating === undefined || rating < 1 || rating > 5)
    ) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const interaction = await interactionService.upsertInteraction({
      userId,
      contentId,
      action: userAction,
      rating,
      type,
    });

    return res.status(200).json({
      message: "Interaction recorded",
      data: interaction,
    });
  } catch (error) {
    console.error("trackInteraction error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyInteractions(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.userId;

    const interactions = await interactionService.getUserInteractions(userId);

    return res.status(200).json({
      message: "User interactions fetched",
      data: interactions,
    });
  } catch (error) {
    console.error("getMyInteractions error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
