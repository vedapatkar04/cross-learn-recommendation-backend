import { Schema, model } from "mongoose";

interface IRecommendation {
  userId: Schema.Types.ObjectId;
  fromContentId: Schema.Types.ObjectId;
  toContentId: Schema.Types.ObjectId;
  reason: string;
  upvotes: number;
}

interface IRecommendationType extends IRecommendation {
  _id: Schema.Types.ObjectId;
  dCreatedAt: Date;
  dUpdatedAt: Date;
}

const schema = new Schema<IRecommendationType>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fromContentId: {
      type: Schema.Types.ObjectId,
      ref: "MasterContent",
      required: true,
    },
    toContentId: {
      type: Schema.Types.ObjectId,
      ref: "MasterContent",
      required: true,
    },
    reason: { type: String, required: false, default: "" },
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const CommunityRecommendation = model<IRecommendationType>(
  "CommunityRecommendation",
  schema,
  "CommunityRecommendation",
);

export { CommunityRecommendation, IRecommendation, IRecommendationType };
