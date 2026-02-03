"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../authorization/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.authMiddleware);
router.get("/me", auth_1.authMiddleware);
exports.default = router;
