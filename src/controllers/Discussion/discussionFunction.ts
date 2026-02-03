import { Request, Response } from "express";
import {
  createDiscussion,
  likeDiscussion,
  getDiscussionsByContent,
  softDeleteDiscussion,
} from "../../service/discussionService";
 import { AuthRequest } from "../../authorization/auth";


export async function create(req: AuthRequest, res: Response) {
  try {
    const { contentId, title, body } = req.body;

    const discussion = await createDiscussion({
      userId: req.user!.userId,
      contentId,
      title,
      body,
    });

    res.status(201).json({ discussion });
  } catch {
    res.status(500).json({ message: "Create discussion failed" });
  }
}

export async function like(req: Request, res: Response) {
  const updated = await likeDiscussion(req.params.id, req.params.contentId);
  res.json({ updated });
}

export async function list(req: Request, res: Response) {
  const discussions = await getDiscussionsByContent(req.params.contentId);
  res.json({ discussions });
}

export async function remove(req: Request, res: Response) {
  await softDeleteDiscussion(req.params.id, req.params.contentId);
  res.json({ message: "Discussion removed" });
}
