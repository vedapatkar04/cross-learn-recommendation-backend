"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = __importDefault(require("../util/generateToken"));
async function refresh(req, res) {
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        (0, generateToken_1.default)(decoded.userId, res);
        res.json({
            message: "Token refreshed",
        });
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
exports.refresh = refresh;
