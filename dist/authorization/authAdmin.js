"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = adminMiddleware;
function adminMiddleware(req, res, next) {
    if (!req.user || req.body.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
}
