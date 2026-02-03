import { Schema, model } from "mongoose";

interface IUserRecommendation {
  userId: Schema.Types.ObjectId;
  contentId: Schema.Types.ObjectId;
  score: number;
}

interface IUserRecommendationType extends IUserRecommendation {
  _id: Schema.Types.ObjectId;
  dCreatedAt: Date;
  dUpdatedAt: Date;
}

const schema = new Schema<IUserRecommendationType>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    score: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } },
);

const UserRecommendation = model<IUserRecommendationType>(
  "UserRecommendation",
  schema,
  "UserRecommendation",
);

export { UserRecommendation, IUserRecommendation, IUserRecommendationType };
