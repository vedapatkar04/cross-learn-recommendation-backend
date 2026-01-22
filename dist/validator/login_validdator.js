"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const option = {
    errors: {
        wrap: {
            label: "",
        },
    },
    allowUnknow: true,
};
const UserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
async function isValidRequest(data) {
    try {
        const result = await UserSchema.validateAsync(data, option);
        return { error: false, info: "" };
    }
    catch (err) {
        return { error: true, info: err.details[0]?.message };
    }
}
exports.isValidRequest = isValidRequest;
