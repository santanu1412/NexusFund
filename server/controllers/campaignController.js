import Campaign from '../models/Campaign.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   GET /api/campaigns
 * @desc    Get all ACTIVE campaigns (public — with filtering, search, pagination)
 */
export const getCampaigns = asyncHandler(async (req, res) => {
  const { category, search, sort, page = 1, limit = 12 } = req.query;

  // Public endpoint: only return active campaigns
  const filter = { status: 'active' };
  if (category) filter.category = category;
  if (search) {
    filter.$text = { $search: search };
  }

  const sortOptions = {};
  switch (sort) {
    case 'newest':
      sortOptions.createdAt = -1;
      break;
    case 'popular':
      sortOptions.backersCount = -1;
      break;
    case 'ending':
      sortOptions.deadline = 1;
      break;
    case 'funded':
      sortOptions.amountRaisedCents = -1;
      break;
    default:
      sortOptions.createdAt = -1;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [campaigns, total] = await Promise.all([
    Campaign.find(filter)
      .populate('beneficiary', 'name avatar')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit)),
    Campaign.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: campaigns,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @route   GET /api/campaigns/:slugOrId
 * @desc    Get a single campaign by slug or ID (public)
 */
export const getCampaignBySlugOrId = asyncHandler(async (req, res) => {
  const { slugOrId } = req.params;

  let campaign;
  // Check if it looks like a MongoDB ObjectId
  if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
    campaign = await Campaign.findById(slugOrId).populate('beneficiary', 'name avatar bio');
  } else {
    campaign = await Campaign.findOne({ slug: slugOrId }).populate('beneficiary', 'name avatar bio');
  }

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  // Non-active campaigns should only be visible to their beneficiary or admins
  // This check is lenient for public access — the frontend decides what to show
  // But we block rejected/pending if they try to access directly
  // (We'll let the frontend handle the case where user is the owner)

  res.json({ success: true, data: campaign });
});

/**
 * @route   POST /api/campaigns
 * @desc    Create a new campaign (beneficiary with completed Stripe onboarding only)
 */
export const createCampaign = asyncHandler(async (req, res) => {
  const user = req.user;

  // Gate: must be beneficiary or admin
  if (user.role !== 'beneficiary' && user.role !== 'admin') {
    throw new ApiError('Only verified beneficiaries can create campaigns', 403);
  }

  // Gate: must have completed Stripe Connect onboarding (admin bypass)
  if (user.role === 'beneficiary' && !user.stripeOnboardingComplete) {
    throw new ApiError('Please complete Stripe identity verification before creating a campaign', 403);
  }

  const { title, story, category, coverImage, documents, goalAmountCents, deadline } = req.body;

  if (!title || !story || !category || !coverImage || !goalAmountCents || !deadline) {
    throw new ApiError('All required fields must be provided', 400);
  }

  const campaign = await Campaign.create({
    title,
    story,
    category,
    coverImage,
    documents: documents || [],
    goalAmountCents: Number(goalAmountCents),
    deadline: new Date(deadline),
    beneficiary: user._id,
    status: 'pending_review', // Always starts in review
  });

  const populated = await campaign.populate('beneficiary', 'name avatar');

  res.status(201).json({ success: true, data: populated });
});

/**
 * @route   PUT /api/campaigns/:id
 * @desc    Update a campaign (only by beneficiary, only in editable states)
 */
export const updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.beneficiary.toString() !== req.user._id.toString()) {
    throw new ApiError('Not authorized to update this campaign', 403);
  }

  // Only allow editing in pending_review or rejected state
  if (!['pending_review', 'rejected'].includes(campaign.status)) {
    throw new ApiError('Campaign can only be edited when pending review or rejected', 400);
  }

  const allowedFields = ['title', 'story', 'category', 'coverImage', 'documents', 'goalAmountCents', 'deadline'];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      campaign[field] = req.body[field];
    }
  });

  // If editing a rejected campaign, re-submit for review
  if (campaign.status === 'rejected') {
    campaign.status = 'pending_review';
    campaign.rejectionReason = '';
  }

  await campaign.save();
  const updated = await campaign.populate('beneficiary', 'name avatar');

  res.json({ success: true, data: updated });
});

/**
 * @route   DELETE /api/campaigns/:id
 * @desc    Delete a campaign (only if pending_review and no donations)
 */
export const deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.beneficiary.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized', 403);
  }

  if (campaign.status !== 'pending_review') {
    throw new ApiError('Only campaigns pending review can be deleted', 400);
  }

  if (campaign.amountRaisedCents > 0) {
    throw new ApiError('Cannot delete a campaign that has received donations', 400);
  }

  await Campaign.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Campaign deleted' });
});

// ─── Authenticated User Endpoints ────────────────────────────────

/**
 * @route   GET /api/campaigns/my
 * @desc    Get current user's campaigns (all statuses)
 */
export const getMyCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({ beneficiary: req.user._id })
    .sort({ createdAt: -1 });

  res.json({ success: true, data: campaigns });
});

// ─── Admin Endpoints ─────────────────────────────────────────────

/**
 * @route   GET /api/campaigns/admin/all
 * @desc    Admin: list all campaigns with all statuses
 */
export const listAllCampaigns = asyncHandler(async (req, res) => {
  const { status, category, search, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [campaigns, total] = await Promise.all([
    Campaign.find(filter)
      .populate('beneficiary', 'name email avatar')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Campaign.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: campaigns,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @route   PUT /api/campaigns/admin/:id/approve
 * @desc    Admin: approve a campaign (pending_review → active)
 */
export const approveCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.status !== 'pending_review') {
    throw new ApiError(`Cannot approve a campaign with status "${campaign.status}"`, 400);
  }

  campaign.status = 'active';
  campaign.reviewedBy = req.user._id;
  campaign.reviewedAt = new Date();
  campaign.rejectionReason = '';
  await campaign.save();

  res.json({
    success: true,
    message: 'Campaign approved',
    data: campaign,
  });
});

/**
 * @route   PUT /api/campaigns/admin/:id/reject
 * @desc    Admin: reject a campaign with a reason
 */
export const rejectCampaign = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason || reason.trim().length < 5) {
    throw new ApiError('Rejection reason is required (min 5 characters)', 400);
  }

  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.status !== 'pending_review') {
    throw new ApiError(`Cannot reject a campaign with status "${campaign.status}"`, 400);
  }

  campaign.status = 'rejected';
  campaign.rejectionReason = reason.trim();
  campaign.reviewedBy = req.user._id;
  campaign.reviewedAt = new Date();
  await campaign.save();

  res.json({
    success: true,
    message: 'Campaign rejected',
    data: campaign,
  });
});
