import { Router } from "express";
import { register } from "../controllers/register";
import { login } from "../controllers/login";
import { refresh } from "../controllers/refresh";
import { logout } from "../controllers/logout";
 import { authMiddleware } from "../authorization/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authMiddleware, logout);


export default router;
