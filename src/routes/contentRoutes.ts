import { Router } from "express";
import { getMasterContent } from "../controllers/content/getMasterContent";
import { authMiddleware } from "../authorization/auth";

const router = Router();

router.get("/getMasterContent", getMasterContent);


export default router;
