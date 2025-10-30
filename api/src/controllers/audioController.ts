import { Request, Response } from 'express';
import { pool } from '../config/mysqlPool';
import { PlayerRegister, PlayerReturn } from '../types/playerSQL';
import { uuidParse, uuidStringify } from "../utils/uuid";
import { v7 as uuidv7, v7 } from 'uuid';
import { RegisterRequest } from '../types/request';
import { LoginResponse, RegisterResponse } from '../types/response';

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const sql = 'SELECT * FROM players';
        const [rows] = await pool.execute<PlayerReturn[]>(sql);
        res.status(200).json(rows);
    } catch (error) {
        // res.status(500).json({ message: 'Failed to fetch players' });
        res.status(500).json({ message: `${error}` });
    }
};

export const postMusic = async (req: Request, res: Response): Promise<void> => {
    try {
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Invalid login server error'
        } satisfies LoginResponse);
    }
}
