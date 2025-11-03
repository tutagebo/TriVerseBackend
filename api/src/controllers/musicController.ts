import { Request, Response } from 'express';
import { pool } from '../config/mysqlPool';
import { PlayerRegister, PlayerReturn } from '../types/playerSQL';
import { uuidParse, uuidStringify } from "../utils/uuid";
import { v7 as uuidv7, v7 } from 'uuid';
import { LoginResponse, RegisterResponse } from '../types/response';
import { removeDir, saveFile } from '../utils/file';
import { MusicData } from '../types/musicData';

import dotenv from 'dotenv';
import { isExistSession } from '../utils/session';
dotenv.config();

// 型用
declare global {
  namespace Express {
    interface Request {
      files?: {
        music?: Multer.File[];
        jacket?: Multer.File[];
        license_image?: Multer.File[];
        // 他にもあればここに追加
      };
    }
  }
}

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Get all music' });
    } catch (error) {
        // res.status(500).json({ message: 'Failed to fetch players' });
        res.status(500).json({ message: `${error}` });
    }
};


// 無限にアップロードできるとまずいので、適切に制限をかける
// ユーザー認証も必要
// 許可用のテーブルも実装したい
export const postMusic = async (req: Request, res: Response): Promise<void> => {
    if (!(await isExistSession(req.body.sid))) {
        res.status(401).json({
            success: false,
            message: '無効なセッションです。',
        });
        return;
    }
    if (!req.files?.music?.[0] || !req.files?.jacket?.[0]) {
        res.status(400).json({
            success: false,
            message: 'music または jacket ファイルが送信されていません。',
        });
        return;
    }
    const musicData: MusicData = {
        id: v7() as string,
        artist: req.body.artist as string,
        title: req.body.title as string,
        postPlayerId: req.body.post_player_id as string,
        audioData: req.files?.music?.[0].buffer as Buffer,
        jacketData: req.files?.jacket?.[0].buffer as Buffer,
        licenseImageData: req.files?.license_image?.[0]?.buffer as Buffer,
    }
    const MUSIC_DIR: string = (process.env.DATA_DIR || '/app/data') + `/music/${musicData.id}/`;

    const conn = await pool.getConnection();
    try {
        // トランザクション開始
        await conn.beginTransaction();
        const sql = 'INSERT INTO musics (id, artist, title, post_player_id) VALUES (?, ?, ?, ?)'
        await conn.execute(sql, [
            Buffer.from(uuidParse(musicData.id)),
            musicData.artist, musicData.title,
            Buffer.from(uuidParse(musicData.postPlayerId))
        ]);
        // ファイル保存
        await saveFile(MUSIC_DIR + "audio.mp3", musicData.audioData!);
        await saveFile(MUSIC_DIR + "jacket.jpg", musicData.jacketData!);
        await saveFile(MUSIC_DIR + "license.jpg", musicData.licenseImageData!);

        // ここで反映
        await conn.commit();

        res.status(200).json({
            success: true,
            message: 'Music uploaded successfully'
        } satisfies LoginResponse);

    } catch (error) {
        // エラー時はロールバック
        try { await conn.rollback(); } catch {}
        await removeDir(MUSIC_DIR);
        res.status(500).json({
            success: false,
            message: 'register error: ' + `${error}`
        } satisfies LoginResponse);
    } finally {
        // ここで接続解放
        try { await conn.release(); } catch {}
    }
}
