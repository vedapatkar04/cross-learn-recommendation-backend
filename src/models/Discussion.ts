import { Schema, model } from "mongoose";

interface IDiscussion {
  userId: Schema.Types.ObjectId;
  contentId: Schema.Types.ObjectId;
  title: string;
  body: string;
  likes: number;
  isDeleted: boolean;
}

interface IDiscussionType extends IDiscussion {
  _id: Schema.Types.ObjectId;
  dCreatedAt: Date;
  dUpdatedAt: Date;
}

const schema = new Schema<IDiscussionType>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: Schema.Types.ObjectId, ref: "MasterContent", required: true },
    title: { type: String, required: false, default: "" },
    body: { type: String, required: false, default: "" },
    likes: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" }, },
);

const Discussion = model<IDiscussionType>("Discussion", schema, "Discussion");

export { Discussion, IDiscussion, IDiscussionType };
