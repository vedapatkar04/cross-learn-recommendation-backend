"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentFunction_1 = require("../controllers/content/contentFunction");
const auth_1 = require("../authorization/auth");
const router = (0, express_1.Router)();
router.get("/", contentFunction_1.getMasterContent);
router.get("/:id", auth_1.authMiddleware, contentFunction_1.getContentDetails);
exports.default = router;
