import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Campaign title is required'],
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    story: {
      type: String,
      required: [true, 'Campaign story is required'],
      maxlength: 10000,
    },
    category: {
      type: String,
      required: true,
      enum: ['Medical', 'Emergency', 'Education', 'Community', 'Memorial', 'Other'],
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    documents: [
      {
        type: String, // Cloudinary URLs for proof documents
      },
    ],
    goalAmountCents: {
      type: Number,
      required: [true, 'Goal amount is required'],
      min: [1000, 'Minimum goal is $10 (1000 cents)'],
    },
    amountRaisedCents: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'usd',
      enum: ['usd'],
    },
    backersCount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    status: {
      type: String,
      enum: ['pending_review', 'active', 'rejected', 'funded', 'closed', 'flagged'],
      default: 'pending_review',
    },
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Review fields
    rejectionReason: {
      type: String,
      default: '',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title before validation
campaignSchema.pre('validate', async function (next) {
  if (this.isNew || this.isModified('title')) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Ensure uniqueness by appending a short random suffix
    let slug = baseSlug;
    let existing = await mongoose.model('Campaign').findOne({ slug, _id: { $ne: this._id } });
    let attempt = 0;
    while (existing && attempt < 10) {
      const suffix = Math.random().toString(36).substring(2, 7);
      slug = `${baseSlug}-${suffix}`;
      existing = await mongoose.model('Campaign').findOne({ slug, _id: { $ne: this._id } });
      attempt++;
    }
    this.slug = slug;
  }
  next();
});

// Virtual: days left
campaignSchema.virtual('daysLeft').get(function () {
  const now = new Date();
  const diff = this.deadline - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Virtual: formatted goal in dollars (display convenience)
campaignSchema.virtual('goalAmountDollars').get(function () {
  return (this.goalAmountCents / 100).toFixed(2);
});

// Virtual: formatted raised in dollars
campaignSchema.virtual('amountRaisedDollars').get(function () {
  return (this.amountRaisedCents / 100).toFixed(2);
});

// Ensure virtuals are included in JSON
campaignSchema.set('toJSON', { virtuals: true });
campaignSchema.set('toObject', { virtuals: true });

// Indexes for search and filtering
campaignSchema.index({ slug: 1 });
campaignSchema.index({ category: 1, status: 1 });
campaignSchema.index({ beneficiary: 1 });
campaignSchema.index({ status: 1 });
campaignSchema.index({ createdAt: -1 });
campaignSchema.index({ title: 'text', story: 'text' });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
