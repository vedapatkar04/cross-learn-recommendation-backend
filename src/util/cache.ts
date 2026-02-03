import Redis from "ioredis";
import { redisConnection } from "../config/redis";

export const redis = new Redis(redisConnection);

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(
  key: string,
  value: any,
  ttl = 300, // 5 min default
) {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}

export async function deleteCache(key: string) {
  await redis.del(key);
}
