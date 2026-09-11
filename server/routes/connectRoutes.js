import { Router } from 'express';
import {
  createOnboardingLink,
  getOnboardingStatus,
  createDashboardLink,
} from '../controllers/connectController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/onboarding-link', protect, requireRole('beneficiary'), createOnboardingLink);
router.get('/status', protect, getOnboardingStatus);
router.post('/dashboard-link', protect, requireRole('beneficiary'), createDashboardLink);

export default router;
