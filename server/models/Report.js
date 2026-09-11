import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: [true, 'Report reason is required'],
      maxlength: 1000,
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'resolved'],
      default: 'open',
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
    },
    resolution: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

reportSchema.index({ campaign: 1 });
reportSchema.index({ status: 1 });

const Report = mongoose.model('Report', reportSchema);
export default Report;
