import { Schema, model } from "mongoose";

enum action {
  view = 1,
  enroll = 2,
  startReading = 3,
  complete = 4,
  rate = 5,
  bookmark = 6,
}

enum types {
  course = 1,
  book = 2,
}

interface IUserContent {
  userId: Schema.Types.ObjectId;
  contentId: Schema.Types.ObjectId;
  action: action;
  rating: number;
  type: types;
}

interface IUserContentType extends IUserContent {
  _id: Schema.Types.ObjectId;
  dCreatedAt: Date;
  dUpdatedAt: Date;
}

const schema = new Schema<IUserContentType>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: Schema.Types.ObjectId, ref: "MasterContent", required: true },
    action: {
      type: Number,
      enum: action,
      required: true,
    },
    rating: { type: Number, min: 1, max: 5 },
    type: { type: Number, enum: types, required: false, default: types.course },
  },
  { timestamps: true },
);

const Interaction = model<IUserContentType>(
  "Interaction",
  schema,
  "Interaction",
);

export { Interaction, IUserContent, IUserContentType, action };
