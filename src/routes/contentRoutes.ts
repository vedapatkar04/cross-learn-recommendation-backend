import { Router } from "express";
import { getMasterContent, getContentDetails } from "../controllers/content/contentFunction";
import { authMiddleware } from "../authorization/auth";

const router = Router();

router.get("/", getMasterContent);
router.get("/:id", authMiddleware, getContentDetails);


export default router;
