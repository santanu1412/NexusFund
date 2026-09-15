import mongoose from 'mongoose';
const donationSchema = new mongoose.Schema(
  {
    amountCents: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [100, 'Minimum donation is $1 (100 cents)'],
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    guestName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    stripeSessionId: {
      type: String,
    },
    stripePaymentIntentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
donationSchema.virtual('amountDollars').get(function () {
  return (this.amountCents / 100).toFixed(2);
});
donationSchema.set('toJSON', {
  virtuals: true,
});
donationSchema.set('toObject', {
  virtuals: true,
});
donationSchema.index({
  campaign: 1,
});
donationSchema.index({
  donor: 1,
});
donationSchema.index({
  status: 1,
});
const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
