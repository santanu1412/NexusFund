import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Comment text is required'],
      maxlength: 1000,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.index({
  campaign: 1,
  createdAt: -1,
});
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
