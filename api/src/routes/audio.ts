import express, { Router } from 'express';
import * as apiPath from '../controllers/audioController';

const router: Router = express.Router();

// /player/
// 公開時には削除
router.get('/', apiPath.getAll);

router.post('/register', apiPath.postMusic);

export default router;
