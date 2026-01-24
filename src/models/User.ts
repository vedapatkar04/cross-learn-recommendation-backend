import { Schema, model } from "mongoose";

enum levels {
  beginner = 1,
  intermediate = 2,
  advanced = 3,
}

interface IUser {
  email: string;
  password: string;
  name?: string;
  isAdmin: boolean;
  skillLevel: levels;
  interests: string[];
  learningGoals: string[];
}

interface IUserType extends IUser {
  _id: Schema.Types.ObjectId;
  dCreatedAt: Date;
  dUpdatedAt: Date;
}

const schema = new Schema<IUserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false, default: "" },
    isAdmin: { type: Boolean, required: false, default: false },
    skillLevel: {
      type: Number,
      enum: levels,
      required: false,
      default: levels.beginner,
    },
    interests: [{ type: String, required: false, default: [] }],
    learningGoals: [{ type: String, required: false, default: [] }],
  },
  {
    timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" },
  },
);

schema.index({ email: 1 });

const User = model<IUserType>("User", schema, "User");

export { User, IUser, IUserType };
