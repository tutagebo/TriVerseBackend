import express, { Application } from 'express';
import playerRouter from './routes/player';

const app: Application = express();
const port = 3000;

// JSONデータを扱うためのミドルウェア
app.use(express.json());

// ルート登録
app.use('/player', playerRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
// TODO: TSにする
