import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import communityRoutes from "./routes/communityRoutes";
import interactionRoutes from "./routes/interactionRoutes";
import discussionRoutes from "./routes/discussionRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/content", contentRoutes);
app.use("/interaction", interactionRoutes);
app.use("/community", communityRoutes);
app.use("/discussion", discussionRoutes);

export default app;
