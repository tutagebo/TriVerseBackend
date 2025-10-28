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

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = uuidParse(req.params.id);   // /player/:idからidを取得してる
        const sql = 'SELECT * FROM players WHERE id = ?';
        const [rows] = await pool.execute<PlayerReturn[]>(sql, [id]);

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
    const registerPlayer: PlayerRegister = {
        id: Buffer.from(uuidParse(v7())),
        login_id: requestBody.login_id,
        name: requestBody.name,
        password_hash: Buffer.from(requestBody.password, 'utf-8')
    };

    const checkSql = 'SELECT id FROM players WHERE login_id = ? LIMIT 1';
    const [rows] = await pool.execute<PlayerReturn[]>(checkSql, [requestBody.login_id]);
    if (rows.length > 0) {
      res.status(409).json({
        success: false,
        message: 'This login_id is already in use'
      } satisfies RegisterResponse);
      return;
    }

    const sql = 'INSERT INTO players (id, login_id, name, password_hash) VALUES (?, ?, ?, ?)'
    await pool.execute(sql, [registerPlayer.id, registerPlayer.login_id, registerPlayer.name, registerPlayer.password_hash]);
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

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { login_id, password } = req.body;
        const sql = 'SELECT * FROM players WHERE login_id = ? AND password_hash = ?';
        const [rows] = await pool.execute<PlayerReturn[]>(sql, [login_id, Buffer.from(password, 'utf-8')]);
        const new_player: PlayerReturn = rows[0] ?? null;

        if(!new_player) {
            res.status(401).json({
                success: false,
                message: 'Invalid login credentials'
            } satisfies LoginResponse);
            return;
        }

        const player_res: LoginResponse = {
            success: true,
            message: 'Player registered successfully',
            data: {
                name: new_player.name,
                uuid: uuidStringify(new_player.id)
            }
        };
        res.status(200).json(player_res);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Invalid login server error'
        } satisfies LoginResponse);
    }
}

export const postMusic = async (req: Request, res: Response): Promise<void> => {
    try {
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Invalid login server error'
        } satisfies LoginResponse);
    }
}
