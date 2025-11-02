import * as crypto from "crypto";
import { redis } from "../config/redis";
const SESSION_TTL = 60 * 60 * 24 * 7; // 1週間

export async function generateSession(userId: string): Promise<string> {
    const sid = crypto.randomBytes(32).toString("hex");
    await redis.set(`sess:${sid}`, JSON.stringify({ userId }), "EX", SESSION_TTL);
    return sid;
}

export async function isExistSession(sid: string): Promise<boolean> {
    const session = await redis.get(`sess:${sid}`);
    if (!session) return false;
    await redis.expire(`sess:${sid}`, SESSION_TTL);
    return true;
}

export async function destroySession(sid: string): Promise<void> {
    await redis.del(`sess:${sid}`);
}
