import { Router } from 'express';
import { createReport, listReports, resolveReport } from '../controllers/reportController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/:campaignId', protect, createReport);
router.get('/', protect, requireRole('admin'), listReports);
router.put('/:id/resolve', protect, requireRole('admin'), resolveReport);

export default router;
