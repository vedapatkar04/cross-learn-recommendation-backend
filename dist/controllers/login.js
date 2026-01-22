"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../util/generateToken"));
const login_validdator_1 = require("../validator/login_validdator");
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { error, info } = await (0, login_validdator_1.isValidRequest)(req.body);
        if (error)
            return res
                .status(400)
                .json({ info, message: "Email and password required" });
        //if user exist
        const existing_user = await models_1.User.findOne({ email: email }).lean();
        if (!existing_user)
            return res.status(400).json({ message: "Invalid credentials" });
        // Password match
        const password_match = await bcryptjs_1.default.compare(password, existing_user.password);
        if (!password_match)
            return res.status(400).json({ message: "Invalid credentials" });
        (0, generateToken_1.default)(existing_user._id.toString(), res);
        res.json({
            message: "Login successfull",
            responseMsg: {
                userId: existing_user._id,
                email: existing_user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
exports.login = login;
