import stripe from '../config/stripe.js';
import Campaign from '../models/Campaign.js';
import Donation from '../models/Donation.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   POST /api/donations/checkout/:campaignId
 * @desc    Create a Stripe Checkout session for a donation (supports guest & authenticated)
 */
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { amountCents, isAnonymous, message, guestName } = req.body;
  const { campaignId } = req.params;

  if (!amountCents || amountCents < 100) {
    throw new ApiError('Minimum donation is $1 (100 cents)', 400);
  }

  if (amountCents > 99999900) {
    throw new ApiError('Maximum single donation is $999,999', 400);
  }

  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new ApiError('Campaign not found', 404);
  }

  if (campaign.status !== 'active') {
    throw new ApiError('This campaign is no longer accepting donations', 400);
  }

  // Create a pending donation record
  const donationData = {
    amountCents: Number(amountCents),
    campaign: campaign._id,
    isAnonymous: isAnonymous || false,
    message: message || '',
    status: 'pending',
  };

  // Authenticated user or guest
  if (req.user) {
    donationData.donor = req.user._id;
  } else {
    donationData.guestName = guestName || 'Anonymous Guest';
  }

  const donation = await Donation.create(donationData);

  // Build Checkout Session
  const amountDollars = (Number(amountCents) / 100).toFixed(2);
  const sessionConfig = {
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: campaign.currency || 'usd',
          product_data: {
            name: `Donation to "${campaign.title}"`,
            description: `Support this campaign on NexusFund`,
          },
          unit_amount: Number(amountCents),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/campaigns/${campaign.slug || campaignId}`,
    metadata: {
      donationId: donation._id.toString(),
      campaignId: campaign._id.toString(),
      donorId: req.user ? req.user._id.toString() : 'guest',
    },
  };

  // Pre-fill email for authenticated users
  if (req.user) {
    sessionConfig.customer_email = req.user.email;
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  // Store session ID on the donation
  donation.stripeSessionId = session.id;
  await donation.save();

  res.json({ success: true, url: session.url });
});

/**
 * @route   GET /api/donations/campaign/:campaignId
 * @desc    Get donations for a specific campaign (public, masks anonymous donors)
 */
export const getCampaignDonations = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const donations = await Donation.find({
    campaign: req.params.campaignId,
    status: 'succeeded',
  })
    .populate('donor', 'name avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  // Mask donor info for anonymous donations
  const maskedDonations = donations.map((d) => {
    const obj = d.toJSON();
    if (obj.isAnonymous) {
      obj.donor = null;
      obj.guestName = 'Anonymous';
    }
    return obj;
  });

  const total = await Donation.countDocuments({
    campaign: req.params.campaignId,
    status: 'succeeded',
  });

  res.json({
    success: true,
    data: maskedDonations,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});
