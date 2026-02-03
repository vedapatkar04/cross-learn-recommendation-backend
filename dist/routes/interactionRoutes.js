"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../authorization/auth");
const interactionFunction_1 = require("../controllers/interaction/interactionFunction");
const router = (0, express_1.Router)();
router.post("/", auth_1.authMiddleware, interactionFunction_1.trackInteraction);
router.get("/me", auth_1.authMiddleware, interactionFunction_1.getMyInteractions);
exports.default = router;
