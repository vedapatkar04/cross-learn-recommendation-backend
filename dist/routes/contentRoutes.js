"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getMasterContent_1 = require("../controllers/content/getMasterContent");
const router = (0, express_1.Router)();
router.get("/getMasterContent", getMasterContent_1.getMasterContent);
exports.default = router;
