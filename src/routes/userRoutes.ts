import { Router } from "express";
import { register } from "../controllers/register";
import { login } from "../controllers/login";
import { updateProfile } from "../controllers/updateProfile";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/updateProfile", updateProfile);
 
export default router;