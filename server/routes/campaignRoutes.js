import { Router } from 'express';
import {
  getCampaigns,
  getCampaignBySlugOrId,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getMyCampaigns,
  listAllCampaigns,
  approveCampaign,
  rejectCampaign,
} from '../controllers/campaignController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Admin routes (must be before /:slugOrId to avoid route shadowing)
router.get('/admin/all', protect, requireRole('admin'), listAllCampaigns);
router.put('/admin/:id/approve', protect, requireRole('admin'), approveCampaign);
router.put('/admin/:id/reject', protect, requireRole('admin'), rejectCampaign);

// Public routes
router.get('/', getCampaigns);

// Authenticated user routes (must be before /:slugOrId)
router.get('/my', protect, getMyCampaigns);

router.get('/:slugOrId', getCampaignBySlugOrId);

// Protected routes
router.post('/', protect, requireRole('beneficiary', 'admin'), createCampaign);
router.put('/:id', protect, updateCampaign);
router.delete('/:id', protect, deleteCampaign);

export default router;
