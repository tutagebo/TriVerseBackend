import Redis from "ioredis";

// 例: REDIS_URL=redis://default:pass@tv_session_redis:6379
export const redis = new Redis(process.env.REDIS_URL!, {
    lazyConnect: true,           // 明示的に connect() する
    maxRetriesPerRequest: 2,     // 長時間ブロック回避（AOF rewrite時など）
    enableReadyCheck: true,      // レディ検出（クラスタ/レプリカ構成で有効）
});

// 起動時に接続
export async function initRedis() {
    redis.on("error", (error: Error) => console.error("[redis] error", error));
    redis.on("connect", () => console.log("[redis] connect"));
    redis.on("ready", () => console.log("[redis] ready"));
    await redis.connect();
}

// 終了時にクリーンアップ
export async function closeRedis() {
    await redis.quit();
}