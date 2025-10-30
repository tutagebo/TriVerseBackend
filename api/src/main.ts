import express, { Application } from 'express';
import playerRouter from './routes/player';
import musicRouter from './routes/music';

const app: Application = express();
const port = 3000;

// JSONデータを扱うためのミドルウェア
app.use(express.json());

// ルート登録
app.use('/player', playerRouter);
app.use('/music', musicRouter);

app.listen(port, async () => {
    console.log(`listening on ${port}`);
});
