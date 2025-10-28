import { Request, Response } from 'express';
import { pool } from '../config/mysqlPool';
import { Player } from '../types/playerRetrunSQL';
import { uuidParse, uuidStringify } from "../utils/uuid";
import { RegisterRequest } from '../types/request';
import { RegisterResponse } from '../types/response';

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const sql = 'SELECT * FROM players';
        const [rows] = await pool.execute<Player[]>(sql);
        res.status(200).json(rows);
    } catch (error) {
        // res.status(500).json({ message: 'Failed to fetch players' });
        res.status(500).json({ message: `${error}` });
    }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = uuidParse(req.params.id);   // /player/:idからidを取得してる
        const sql = 'SELECT * FROM players WHERE id = ?';
        const [rows] = await pool.execute<Player[]>(sql, [id]);

        if(rows.length === 0) {
            res.status(404).json({ message: 'Player not found' });
            return;
        }
        const player_res = {
            ...rows[0],
            id: uuidStringify(rows[0].id)
        };
        res.status(200).json(player_res);

    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const requestBody: RegisterRequest = req.body;
    await pool.execute('INSERT INTO players (login_id, name, password_hash) VALUES (?, ?, ?)', [requestBody.login_id, requestBody.name, requestBody.password]);
    const response: RegisterResponse = {
      success: true,
      message: 'Player registered successfully',
      data: {
        login_id: requestBody.login_id,
        name: requestBody.name
      }
    };
    res.status(201).json(response);
};
