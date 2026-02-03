"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../authorization/auth");
const authAdmin_1 = require("../authorization/authAdmin");
const contentAdmin = __importStar(require("../controllers/admin/adminContent"));
const discussionAdmin = __importStar(require("../controllers/admin/adminDiscussion"));
const communityAdmin = __importStar(require("../controllers/admin/adminCommunity"));
const statsAdmin = __importStar(require("../controllers/admin/adminStats"));
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware, authAdmin_1.adminMiddleware);
// Content
router.post("/content", contentAdmin.create);
router.put("/content/:id", contentAdmin.update);
router.delete("/content/:id", contentAdmin.remove);
// Discussions
router.get("/discussions/reported", discussionAdmin.listReported);
router.delete("/discussions/:id", discussionAdmin.softDelete);
// Community recommendations
router.get("/community/reported", communityAdmin.listFlagged);
router.delete("/community/:id", communityAdmin.remove);
// Stats
router.get("/stats", statsAdmin.overview);
exports.default = router;
