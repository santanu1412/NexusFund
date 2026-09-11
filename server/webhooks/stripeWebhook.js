import stripe from '../config/stripe.js';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import ProcessedEvent from '../models/ProcessedEvent.js';
import { emitFundingUpdate } from '../socket/socketManager.js';

/**
 * @route   POST /api/webhooks/stripe
 * @desc    Handle Stripe webhook events (payments, Connect account updates)
 * @note    This route uses express.raw() — registered BEFORE express.json() in server.js
 */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ── Idempotency check ──────────────────────────────────────────
  try {
    await ProcessedEvent.create({
      eventId: event.id,
      eventType: event.type,
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate event — already processed
      console.log(`⏭️ Duplicate webhook event: ${event.id}`);
      return res.json({ received: true, duplicate: true });
    }
    // Other DB errors — log but continue processing
    console.error('⚠️ Error checking event idempotency:', err.message);
  }

  // ── Handle the event ───────────────────────────────────────────
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleSuccessfulPayment(session);
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object;
        await handleExpiredSession(session);
        break;
      }
      case 'account.updated': {
        const account = event.data.object;
        await handleAccountUpdated(account);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`❌ Error processing webhook ${event.type}:`, err);
    // Still return 200 to prevent Stripe retries for app-level errors
  }

  res.json({ received: true });
};

/**
 * Process a successful payment — update donation and campaign.
 */
async function handleSuccessfulPayment(session) {
  const { donationId, campaignId } = session.metadata || {};
  if (!donationId || !campaignId) return;

  // Update donation status
  const donation = await Donation.findById(donationId);
  if (!donation || donation.status === 'succeeded') return;

  donation.status = 'succeeded';
  donation.stripePaymentIntentId = session.payment_intent;
  await donation.save();

  // Atomically update campaign totals
  const campaign = await Campaign.findByIdAndUpdate(
    campaignId,
    {
      $inc: { amountRaisedCents: donation.amountCents, backersCount: 1 },
    },
    { new: true }
  );

  if (campaign) {
    // Check if the campaign just got fully funded
    if (
      campaign.amountRaisedCents >= campaign.goalAmountCents &&
      campaign.status === 'active'
    ) {
      campaign.status = 'funded';
      await campaign.save();
    }

    // Emit real-time update via Socket.IO
    emitFundingUpdate(campaignId, {
      amountRaisedCents: campaign.amountRaisedCents,
      backersCount: campaign.backersCount,
      status: campaign.status,
    });

    // Create notification for campaign beneficiary
    const donorDisplay = donation.isAnonymous
      ? 'Someone'
      : donation.guestName || 'A supporter';
    const amountDollars = (donation.amountCents / 100).toFixed(2);

    await Notification.create({
      user: campaign.beneficiary,
      type: 'donation',
      title: 'New Donation!',
      message: `${donorDisplay} donated $${amountDollars} to "${campaign.title}"`,
      relatedCampaign: campaign._id,
    });
  }

  const amountDollars = (donation.amountCents / 100).toFixed(2);
  console.log(`✅ Payment processed: donation ${donationId}, amount $${amountDollars}`);
}

/**
 * Handle an expired checkout session.
 */
async function handleExpiredSession(session) {
  const { donationId } = session.metadata || {};
  if (donationId) {
    await Donation.findByIdAndUpdate(donationId, { status: 'failed' });
    console.log(`⏰ Checkout expired: donation ${donationId}`);
  }
}

/**
 * Handle Stripe Connect account.updated — flip onboarding status.
 */
async function handleAccountUpdated(account) {
  const userId = account.metadata?.nexusfund_user_id;
  if (!userId) {
    // Try to find by connected account ID
    const user = await User.findOne({ stripeConnectedAccountId: account.id });
    if (!user) return;

    if (account.charges_enabled && account.payouts_enabled && !user.stripeOnboardingComplete) {
      user.stripeOnboardingComplete = true;
      await user.save({ validateBeforeSave: false });
      console.log(`✅ Stripe Connect onboarding complete for user ${user._id}`);
    }
    return;
  }

  const user = await User.findById(userId);
  if (!user) return;

  if (account.charges_enabled && account.payouts_enabled && !user.stripeOnboardingComplete) {
    user.stripeOnboardingComplete = true;
    await user.save({ validateBeforeSave: false });
    console.log(`✅ Stripe Connect onboarding complete for user ${userId}`);
  }
}
