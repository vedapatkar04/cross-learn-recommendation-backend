import { Request, Response } from "express";
import * as service from "../../service/adminService";

export async function create(req: Request, res: Response) {
  const content = await service.createContent(req.body);
  res.status(201).json({ content });
}

export async function update(req: Request, res: Response) {
  const content = await service.updateContent(req.params.id, req.body);
  res.json({ content });
}

export async function remove(req: Request, res: Response) {
  await service.softDeleteContent(req.params.id);
  res.json({ message: "Content removed" });
}
