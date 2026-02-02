"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentFunction_1 = require("../controllers/content/contentFunction");
const router = (0, express_1.Router)();
router.get("/", contentFunction_1.getMasterContent);
router.get("/:id", contentFunction_1.getContentDetails);
exports.default = router;
