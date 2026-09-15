import { Router } from 'express';
import { createUpdate, getUpdates } from '../controllers/updateController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.post('/:campaignId', protect, createUpdate);
router.get('/:campaignId', getUpdates);
export default router;
