import { Router } from "express";
import { updateProfile } from "../controllers/updateProfile";
import { getUserProfile } from "../controllers/getUserProfile";
import { authMiddleware } from "../authorization/auth";

const router = Router();

router.post("/updateProfile", authMiddleware, updateProfile);
router.get("/getUserProfile", authMiddleware, getUserProfile);
 

export default router;
