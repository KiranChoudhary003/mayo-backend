import express from 'express';
import { saveToken, sendNotification } from '../notifications/sendNotification.mjs';

const router = express.Router();

router.post('/save-token', saveToken);
router.post('/send-notification', sendNotification);

export default router;