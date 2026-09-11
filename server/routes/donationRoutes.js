import { Router } from 'express';
import {
  createCheckoutSession,
  getCampaignDonations,
} from '../controllers/donationController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Guest or authenticated donation
router.post('/checkout/:campaignId', optionalAuth, createCheckoutSession);

// Public: list donations for a campaign
router.get('/campaign/:campaignId', getCampaignDonations);

export default router;
