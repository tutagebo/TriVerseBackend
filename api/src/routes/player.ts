import express, { Router } from 'express';
import * as apiPath from '../controllers/playerController';

const router: Router = express.Router();

// /player/
router.get('/', apiPath.getAll);
router.get('/:id', apiPath.getById);
router.post('/register', apiPath.register);

export default router;
