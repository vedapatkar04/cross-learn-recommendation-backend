"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login_validdator_1 = require("../validator/login_validdator");
const generateToken_1 = __importDefault(require("../util/generateToken"));
async function register(req, res) {
    try {
        const { email, password } = req.body;
        const { error, info } = await (0, login_validdator_1.isValidRequest)(req.body);
        if (error)
            return res
                .status(400)
                .json({ info, message: "Email and password required" });
        // Check if user exists
        const existing_user = await models_1.User.findOne({ email }).lean();
        if (existing_user)
            return res.status(400).json({ message: "User Already Exists" });
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = await models_1.User.create({
            email,
            password: hashedPassword,
        });
        // ✅ Set JWT in HTTP-only cookie
        (0, generateToken_1.default)(user._id.toString(), res);
        res.status(201).json({
            message: "Registered successfully",
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
exports.register = register;
