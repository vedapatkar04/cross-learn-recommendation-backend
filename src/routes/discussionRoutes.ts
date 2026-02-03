import { Router } from "express";
import {
  create,
  like,
  list,
  remove,
} from "../controllers/Discussion/discussionFunction";
import { authMiddleware } from "../authorization/auth";

const router = Router();

router.post("/", authMiddleware, create);
router.post("/:id/like/:contentId", authMiddleware, like);
router.get("/:contentId", list);
router.delete("/:id", authMiddleware, remove);

export default router;
