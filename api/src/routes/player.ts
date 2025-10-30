import express, { Router } from 'express';
import * as apiPath from '../controllers/playerController';

const router: Router = express.Router();

// /player/
// 公開時には削除
router.get('/', apiPath.getAll);

router.get('/:id', apiPath.getById);
router.post('/login', apiPath.login);
router.post('/register', apiPath.register);

export default router;
