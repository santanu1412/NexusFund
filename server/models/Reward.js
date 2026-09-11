import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Reward title is required'],
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    minimumAmount: {
      type: Number,
      required: [true, 'Minimum pledge amount is required'],
      min: 1,
    },
    estimatedDelivery: {
      type: Date,
    },
    maxBackers: {
      type: Number,
      default: 0, // 0 = unlimited
    },
    currentBackers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Reward = mongoose.model('Reward', rewardSchema);
export default Reward;
