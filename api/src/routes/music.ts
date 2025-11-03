import express, { Router } from 'express';
import * as apiPath from '../controllers/musicController';
import multer from 'multer';
import { FileFormat } from '../types/fileFormat';

const upload = multer({ storage: multer.memoryStorage() });

const router: Router = express.Router();

// /music
// 公開時には削除
router.get('/', apiPath.getAll);

const musicFileFields: FileFormat[] = [
    { name: 'music', maxCount: 1 },
    { name: 'jacket', maxCount: 1 },
    { name: 'license-image', maxCount: 1 }
];
router.post('/upload', upload.fields(musicFileFields), apiPath.postMusic);

export default router;
