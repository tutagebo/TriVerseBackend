import { pool } from "../config/mysqlPool";

/**
 * DB接続確認関数
 * DBが応答しなければ例外を投げる
 */
export async function checkDatabaseConnection(): Promise<boolean> {
    try {
        await pool.query("SELECT 1");
        return true;
    } catch (error) {
        return false;
    }
}
