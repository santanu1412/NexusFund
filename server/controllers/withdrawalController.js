import stripe from '../config/stripe.js';
import WithdrawalRequest from '../models/WithdrawalRequest.js';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * Calculate available balance for a campaign:
 * amountRaisedCents - (sum of all non-rejected withdrawal requests)
 */
async function getAvailableBalance(campaignId) {
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) return 0;

  const withdrawals = await WithdrawalRequest.aggregate([
    {
      $match: {
        campaign: campaign._id,
        status: { $in: ['pending', 'approved', 'paid'] },
      },
    },
    { $group: { _id: null, total: { $sum: '$amountCents' } } },
  ]);

  const totalWithdrawn = withdrawals.length > 0 ? withdrawals[0].total : 0;
  return campaign.amountRaisedCents - totalWithdrawn;
}

/**
 * @route   POST /api/withdrawals/:campaignId
 * @desc    Beneficiary: request a withdrawal for a campaign
 */
export const requestWithdrawal = asyncHandler(async (req, res) => {
  const { amountCents } = req.body;
  const { campaignId } = req.params;

  if (!amountCents || amountCents < 100) {
    throw new ApiError('Minimum withdrawal is $1 (100 cents)', 400);
  }

  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  // Must be the campaign beneficiary
  if (campaign.beneficiary.toString() !== req.user._id.toString()) {
    throw new ApiError('Not authorized — not the campaign beneficiary', 403);
  }

  // Campaign must be active or funded
  if (!['active', 'funded'].includes(campaign.status)) {
    throw new ApiError('Withdrawals are only allowed for active or funded campaigns', 400);
  }

  // Must have completed Stripe onboarding
  if (!req.user.stripeOnboardingComplete || !req.user.stripeConnectedAccountId) {
    throw new ApiError('Stripe Connect onboarding must be completed before requesting a withdrawal', 403);
  }

  // Check available balance
  const availableBalance = await getAvailableBalance(campaignId);
  if (amountCents > availableBalance) {
    throw new ApiError(
      `Requested amount exceeds available balance. Available: $${(availableBalance / 100).toFixed(2)}`,
      400
    );
  }

  // Check for existing pending request
  const existingPending = await WithdrawalRequest.findOne({
    campaign: campaignId,
    beneficiary: req.user._id,
    status: 'pending',
  });
  if (existingPending) {
    throw new ApiError('You already have a pending withdrawal request for this campaign', 400);
  }

  const withdrawal = await WithdrawalRequest.create({
    campaign: campaignId,
    beneficiary: req.user._id,
    amountCents: Number(amountCents),
  });

  res.status(201).json({ success: true, data: withdrawal });
});

/**
 * @route   GET /api/withdrawals/mine
 * @desc    Beneficiary: list their withdrawal requests
 */
export const listMyWithdrawals = asyncHandler(async (req, res) => {
  const withdrawals = await WithdrawalRequest.find({ beneficiary: req.user._id })
    .populate('campaign', 'title slug')
    .populate('reviewedBy', 'name')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: withdrawals });
});

// ─── Admin Endpoints ─────────────────────────────────────────────

/**
 * @route   GET /api/withdrawals/admin/pending
 * @desc    Admin: list all pending withdrawal requests
 */
export const listPendingWithdrawals = asyncHandler(async (req, res) => {
  const { status = 'pending', page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status !== 'all') filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [withdrawals, total] = await Promise.all([
    WithdrawalRequest.find(filter)
      .populate('campaign', 'title slug amountRaisedCents')
      .populate('beneficiary', 'name email stripeConnectedAccountId')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    WithdrawalRequest.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: withdrawals,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

/**
 * @route   PUT /api/withdrawals/admin/:id/approve
 * @desc    Admin: approve a withdrawal → trigger Stripe Transfer to connected account
 */
export const approveWithdrawal = asyncHandler(async (req, res) => {
  const withdrawal = await WithdrawalRequest.findById(req.params.id)
    .populate('beneficiary', 'stripeConnectedAccountId name');

  if (!withdrawal) {
    throw new ApiError('Withdrawal request not found', 404);
  }

  if (withdrawal.status !== 'pending') {
    throw new ApiError(`Cannot approve a withdrawal with status "${withdrawal.status}"`, 400);
  }

  // Verify beneficiary has a connected account
  const connectedAccountId = withdrawal.beneficiary?.stripeConnectedAccountId;
  if (!connectedAccountId) {
    throw new ApiError('Beneficiary does not have a Stripe Connect account', 400);
  }

  // Create Stripe Transfer
  let transfer;
  try {
    transfer = await stripe.transfers.create({
      amount: withdrawal.amountCents,
      currency: 'usd',
      destination: connectedAccountId,
      metadata: {
        withdrawal_id: withdrawal._id.toString(),
        campaign_id: withdrawal.campaign.toString(),
        beneficiary_id: withdrawal.beneficiary._id.toString(),
      },
    });
  } catch (err) {
    throw new ApiError(`Stripe transfer failed: ${err.message}`, 500);
  }

  withdrawal.status = 'paid';
  withdrawal.stripeTransferId = transfer.id;
  withdrawal.reviewedBy = req.user._id;
  withdrawal.reviewedAt = new Date();
  await withdrawal.save();

  res.json({
    success: true,
    message: 'Withdrawal approved and funds transferred',
    data: withdrawal,
  });
});

/**
 * @route   PUT /api/withdrawals/admin/:id/reject
 * @desc    Admin: reject a withdrawal request
 */
export const rejectWithdrawal = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason || reason.trim().length < 5) {
    throw new ApiError('Rejection reason is required (min 5 characters)', 400);
  }

  const withdrawal = await WithdrawalRequest.findById(req.params.id);

  if (!withdrawal) {
    throw new ApiError('Withdrawal request not found', 404);
  }

  if (withdrawal.status !== 'pending') {
    throw new ApiError(`Cannot reject a withdrawal with status "${withdrawal.status}"`, 400);
  }

  withdrawal.status = 'rejected';
  withdrawal.rejectionReason = reason.trim();
  withdrawal.reviewedBy = req.user._id;
  withdrawal.reviewedAt = new Date();
  await withdrawal.save();

  res.json({
    success: true,
    message: 'Withdrawal request rejected',
    data: withdrawal,
  });
});
