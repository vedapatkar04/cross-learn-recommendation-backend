import mongoose from "mongoose";
import { Discussion } from "../models";
import { getCache, setCache, deleteCache } from "../util/cache";

export async function createDiscussion(data: {
  userId: string;
  contentId: string;
  title: string;
  body: string;
}) {
    await deleteCache(`discussions:${data.contentId}`);
  return Discussion.create({
    userId: new mongoose.Types.ObjectId(data.userId),
    contentId: new mongoose.Types.ObjectId(data.contentId),
    title: data.title,
    body: data.body,
    likes: 0,
    isDeleted: false,
  });
}

export async function likeDiscussion(id: string, contentId: string) {
  const updated = await Discussion.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true },
  );

  await deleteCache(`discussions:${contentId}`);
  return updated;
}

export async function getDiscussionsByContent(contentId: string) {
  const cacheKey = `discussions:${contentId}`;

  const cached = await getCache<any[]>(cacheKey);
  if (cached) return cached;

  const discussions = await Discussion.find({
    contentId,
    isDeleted: false,
  })
    .populate("userId", "name")
    .sort({ dCreatedAt: -1 })
    .lean();

  await setCache(cacheKey, discussions, 600); // 10 min
  return discussions;
}

export async function softDeleteDiscussion(
  discussionId: string,
  contentId: string,
) {
  await deleteCache(`discussions:${contentId}`);

  return Discussion.findByIdAndUpdate(
    discussionId,
    { isDeleted: true },
    { new: true },
  );
}
