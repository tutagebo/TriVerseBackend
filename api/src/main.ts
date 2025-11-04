import express, { Application } from 'express';
import playerRouter from './routes/player';
import musicRouter from './routes/music';
import { closeRedis, initRedis } from './config/redis';

const app: Application = express();
const port = 3000;

// JSONデータを扱うためのミドルウェア
app.use(express.json());

// ルート登録
app.use('/player', playerRouter);
app.use('/music', musicRouter);

const server = app.listen(port, '0.0.0.0', async () => {
    await initRedis();
    console.log(`listening on ${port}`);
});

function shutdown() {
    server.close(async () => {
        await closeRedis();
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
