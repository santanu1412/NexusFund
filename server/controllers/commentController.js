import Comment from '../models/Comment.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';
export const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length < 1) {
    throw new ApiError('Comment text is required', 400);
  }
  const comment = await Comment.create({
    campaign: req.params.campaignId,
    user: req.user._id,
    text: text.trim(),
  });
  const populated = await comment.populate('user', 'name avatar');
  res.status(201).json({
    success: true,
    data: populated,
  });
});
export const getComments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const [comments, total] = await Promise.all([
    Comment.find({
      campaign: req.params.campaignId,
    })
      .populate('user', 'name avatar')
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit)),
    Comment.countDocuments({
      campaign: req.params.campaignId,
    }),
  ]);
  res.json({
    success: true,
    data: comments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new ApiError('Comment not found', 404);
  }
  if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized to delete this comment', 403);
  }
  await Comment.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    message: 'Comment deleted',
  });
});
