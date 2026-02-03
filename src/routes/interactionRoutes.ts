import { Router } from "express";
import { authMiddleware } from "../authorization/auth";
import { getMyInteractions, trackInteraction } from "../controllers/interaction/interactionFunction";

const router = Router();

router.post("/", authMiddleware, trackInteraction);
router.get("/me", authMiddleware, getMyInteractions);


export default router;
