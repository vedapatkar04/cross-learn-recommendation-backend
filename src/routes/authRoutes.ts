import { Router } from "express";
import { register } from "../controllers/auth/register";
import { login } from "../controllers/auth/login";
import { refresh } from "../controllers/auth/refresh";
import { logout } from "../controllers/auth/logout";
 import { authMiddleware } from "../authorization/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authMiddleware, logout);


export default router;
