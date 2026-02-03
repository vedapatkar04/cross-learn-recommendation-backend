"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
exports.getCache = getCache;
exports.setCache = setCache;
exports.deleteCache = deleteCache;
const ioredis_1 = __importDefault(require("ioredis"));
const redis_1 = require("../config/redis");
exports.redis = new ioredis_1.default(redis_1.redisConnection);
async function getCache(key) {
    const data = await exports.redis.get(key);
    return data ? JSON.parse(data) : null;
}
async function setCache(key, value, ttl = 300) {
    await exports.redis.set(key, JSON.stringify(value), "EX", ttl);
}
async function deleteCache(key) {
    await exports.redis.del(key);
}
