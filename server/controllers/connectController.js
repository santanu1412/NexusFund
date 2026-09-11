import stripe from '../config/stripe.js';
import User from '../models/User.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   POST /api/connect/onboarding-link
 * @desc    Create a Stripe Connect Express account and return the onboarding URL
 */
export const createOnboardingLink = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.role !== 'beneficiary') {
    throw new ApiError('Only beneficiaries can onboard with Stripe Connect', 403);
  }

  let accountId = user.stripeConnectedAccountId;

  // Create a new connected account if one doesn't exist
  if (!accountId) {
    const account = await stripe.accounts.create({
      type: 'express',
      email: user.email,
      metadata: {
        nexusfund_user_id: user._id.toString(),
      },
      capabilities: {
        transfers: { requested: true },
      },
    });

    accountId = account.id;
    user.stripeConnectedAccountId = accountId;
    await user.save({ validateBeforeSave: false });
  }

  // Create an Account Link for onboarding
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.CLIENT_URL}/onboarding?refresh=true`,
    return_url: `${process.env.CLIENT_URL}/onboarding?complete=true`,
    type: 'account_onboarding',
  });

  res.json({
    success: true,
    url: accountLink.url,
  });
});

/**
 * @route   GET /api/connect/status
 * @desc    Check the current Stripe Connect onboarding status
 */
export const getOnboardingStatus = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user.stripeConnectedAccountId) {
    return res.json({
      success: true,
      data: {
        hasAccount: false,
        onboardingComplete: false,
        chargesEnabled: false,
        payoutsEnabled: false,
      },
    });
  }

  const account = await stripe.accounts.retrieve(user.stripeConnectedAccountId);

  // Update local status if Stripe says it's complete
  const isComplete = account.charges_enabled && account.payouts_enabled;
  if (isComplete && !user.stripeOnboardingComplete) {
    user.stripeOnboardingComplete = true;
    await user.save({ validateBeforeSave: false });
  }

  res.json({
    success: true,
    data: {
      hasAccount: true,
      onboardingComplete: user.stripeOnboardingComplete,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
    },
  });
});

/**
 * @route   POST /api/connect/dashboard-link
 * @desc    Generate a Stripe Express Dashboard login link for the beneficiary
 */
export const createDashboardLink = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user.stripeConnectedAccountId) {
    throw new ApiError('No Stripe Connect account found', 400);
  }

  const loginLink = await stripe.accounts.createLoginLink(user.stripeConnectedAccountId);

  res.json({
    success: true,
    url: loginLink.url,
  });
});
