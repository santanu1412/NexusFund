import { Router } from 'express';
import {
  requestWithdrawal,
  listMyWithdrawals,
  listPendingWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from '../controllers/withdrawalController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Beneficiary routes
router.post('/:campaignId', protect, requireRole('beneficiary'), requestWithdrawal);
router.get('/mine', protect, requireRole('beneficiary'), listMyWithdrawals);

// Admin routes
router.get('/admin/pending', protect, requireRole('admin'), listPendingWithdrawals);
router.put('/admin/:id/approve', protect, requireRole('admin'), approveWithdrawal);
router.put('/admin/:id/reject', protect, requireRole('admin'), rejectWithdrawal);

export default router;
