import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


export const pool = createPool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASS ?? '',
    database: process.env.DB_NAME ?? 'triverse',
    port: Number(process.env.DB_PORT) ?? 53306,
    namedPlaceholders: true,
});