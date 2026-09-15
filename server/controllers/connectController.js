import stripe from '../config/stripe.js';
import User from '../models/User.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';
export const createOnboardingLink = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user.role !== 'beneficiary') {
    throw new ApiError('Only beneficiaries can onboard with Stripe Connect', 403);
  }
  let accountId = user.stripeConnectedAccountId;
  if (!accountId) {
    const account = await stripe.accounts.create({
      type: 'express',
      email: user.email,
      metadata: {
        nexusfund_user_id: user._id.toString(),
      },
      capabilities: {
        transfers: {
          requested: true,
        },
      },
    });
    accountId = account.id;
    user.stripeConnectedAccountId = accountId;
    await user.save({
      validateBeforeSave: false,
    });
  }
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
  const isComplete = account.charges_enabled && account.payouts_enabled;
  if (isComplete && !user.stripeOnboardingComplete) {
    user.stripeOnboardingComplete = true;
    await user.save({
      validateBeforeSave: false,
    });
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
