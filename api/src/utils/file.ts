import fs from 'fs/promises';
import path from 'path';

/**
 * 非同期で指定したパスにファイルを保存する関数
 * @param savePath 保存先ファイルパス（例: "./data/music/song.mp3"）
 * @param buffer ファイルデータ（Buffer）
 */
export async function saveFile(savePath: string, buffer: Buffer): Promise<void> {
    try {
        const dir = path.dirname(savePath);
        // ディレクトリ作成
        await fs.mkdir(dir, { recursive: true });
        // ファイルに書き込み
        await fs.writeFile(savePath, buffer);
    } catch (error) {
        throw new Error(`Failed to save file to ${savePath}`);
    }
}

export async function removeDir(path: string) {
    try {
        await fs.rm(path, { recursive: true, force: true });
    } catch {
        // noop
    }
}
