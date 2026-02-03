import { Router } from "express";
import {
  create,
  upvote,
  list,
} from "../controllers/communityRecommendation/communityRecomFunction";
import { authMiddleware } from "../authorization/auth";

const router = Router();

router.post("/", authMiddleware, create);
router.post("/:id/upvote/:fromContentId", authMiddleware, upvote);
router.get("/:contentId", list);

export default router;
