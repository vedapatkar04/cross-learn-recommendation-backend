import { Request, Response } from "express";
import { Discussion } from "../../models";

export async function listReported(req: Request, res: Response) {
  const discussions = await Discussion.find({
    reported: true,
    isDeleted: false,
  }).lean();

  res.json({ discussions });
}

export async function softDelete(req: Request, res: Response) {
  await Discussion.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  });

  res.json({ message: "Discussion removed" });
}
