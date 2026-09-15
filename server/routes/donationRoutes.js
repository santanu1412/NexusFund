import { Router } from 'express';
import { createCheckoutSession, getCampaignDonations } from '../controllers/donationController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
const router = Router();
router.post('/checkout/:campaignId', optionalAuth, createCheckoutSession);
router.get('/campaign/:campaignId', getCampaignDonations);
export default router;
