import mongoose from "mongoose";
import { MasterContent } from "../models";

export function createContent(data: any) {
  return MasterContent.create(data);
}

export function updateContent(id: string, data: any) {
  return MasterContent.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    data,
    { new: true }
  );
}

export function softDeleteContent(id: string) {
  return MasterContent.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
}
