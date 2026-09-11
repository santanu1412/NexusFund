import mongoose from 'mongoose';

const withdrawalRequestSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amountCents: {
      type: Number,
      required: [true, 'Withdrawal amount is required'],
      min: [100, 'Minimum withdrawal is $1'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'paid'],
      default: 'pending',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      default: '',
    },
    stripeTransferId: {
      type: String,
    },
  },
  { timestamps: true }
);

// Virtual: amount in dollars for display
withdrawalRequestSchema.virtual('amountDollars').get(function () {
  return (this.amountCents / 100).toFixed(2);
});

withdrawalRequestSchema.set('toJSON', { virtuals: true });
withdrawalRequestSchema.set('toObject', { virtuals: true });

withdrawalRequestSchema.index({ beneficiary: 1 });
withdrawalRequestSchema.index({ campaign: 1 });
withdrawalRequestSchema.index({ status: 1 });

const WithdrawalRequest = mongoose.model('WithdrawalRequest', withdrawalRequestSchema);
export default WithdrawalRequest;
