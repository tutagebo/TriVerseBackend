import express, { Router } from 'express';
import * as apiPath from '../controllers/playerController';

const router: Router = express.Router();

// /users/
router.get('/', apiPath.list);
// router.post('/', errorHandler(apiPath.create));

export default router;
