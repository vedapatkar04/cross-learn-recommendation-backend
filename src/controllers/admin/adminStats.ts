import { Request, Response } from "express";
import { User, MasterContent, Interaction } from "../../models";

export async function overview(req: Request, res: Response) {
  const [users, contents, interactions] = await Promise.all([
    User.countDocuments(),
    MasterContent.countDocuments(),
    Interaction.countDocuments(),
  ]);

  res.json({
    users,
    contents,
    interactions,
  });
}
