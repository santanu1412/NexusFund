import Update from '../models/Update.js';
import Campaign from '../models/Campaign.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   POST /api/updates/:campaignId
 * @desc    Beneficiary: post an update to their own campaign
 */
export const createUpdate = asyncHandler(async (req, res) => {
  const { campaignId } = req.params;
  const { text, images } = req.body;

  if (!text || text.trim().length < 10) {
    throw new ApiError('Update text must be at least 10 characters', 400);
  }

  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  // Must be the campaign beneficiary
  if (campaign.beneficiary.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Only the campaign beneficiary can post updates', 403);
  }

  // Campaign must be active or funded
  if (!['active', 'funded'].includes(campaign.status)) {
    throw new ApiError('Updates can only be posted to active or funded campaigns', 400);
  }

  const update = await Update.create({
    campaign: campaignId,
    text: text.trim(),
    images: images || [],
  });

  res.status(201).json({ success: true, data: update });
});

/**
 * @route   GET /api/updates/:campaignId
 * @desc    List updates for a campaign (public)
 */
export const getUpdates = asyncHandler(async (req, res) => {
  const updates = await Update.find({ campaign: req.params.campaignId })
    .sort({ createdAt: -1 });

  res.json({ success: true, data: updates });
});
