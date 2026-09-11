import mongoose from 'mongoose';

const updateSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Update text is required'],
      maxlength: 5000,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

updateSchema.index({ campaign: 1, createdAt: -1 });

const Update = mongoose.model('Update', updateSchema);
export default Update;
