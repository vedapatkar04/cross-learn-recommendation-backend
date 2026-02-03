import { Router } from "express";
import { authMiddleware } from "../authorization/auth";

const router = Router();

router.get("/", authMiddleware);
router.get("/me", authMiddleware);

export default router;
