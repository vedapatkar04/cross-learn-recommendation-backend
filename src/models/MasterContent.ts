import { Schema, model } from "mongoose";

enum types {
  course = 1,
  book = 2,
}

interface IContent {
  title: string;
  description: string;
  skills: string[]; // course
  topics: string[]; // book
  difficulty: string;
  duration: number; // course
  readingTime: number; // book
  instructor: string; // course
  author: string; // book
  type: types;
  popularityScore: number;
  avgRating: number;
}

interface IContentType extends IContent {
  _id: Schema.Types.ObjectId;
  dCreatedAt: Date;
  dUpdatedAt: Date;
}

const schema = new Schema<IContentType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String, required: false, default: [] }],
    topics: [{ type: String, required: false, default: [] }],
    difficulty: { type: String, required: false, default: "" },
    duration: { type: Number, required: false, default: 0 },
    readingTime: { type: Number, required: false, default: 0 },
    instructor: { type: String, required: false, default: "" },
    author: { type: String, required: false, default: "" },
    type: {
      type: Number,
      enum: types,
      required: true,
      default: types.course,
    },
    popularityScore: { type: Number, required: false, default: 0 },
    avgRating: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" },
  },
);

const MasterContent = model<IContentType>(
  "MasterContent",
  schema,
  "MasterContent",
);

export { MasterContent, IContent, IContentType };
