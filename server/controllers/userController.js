import User from '../models/User.js';
import Campaign from '../models/Campaign.js';
import Donation from '../models/Donation.js';
import WithdrawalRequest from '../models/WithdrawalRequest.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      stripeOnboardingComplete: user.stripeOnboardingComplete,
      stripeConnectedAccountId:
        user.role === 'beneficiary' ? user.stripeConnectedAccountId : undefined,
      createdAt: user.createdAt,
    },
  });
});
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, avatar } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  if (name) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (avatar) user.avatar = avatar;
  await user.save();
  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      stripeOnboardingComplete: user.stripeOnboardingComplete,
    },
  });
});
export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const isBeneficiary = req.user.role === 'beneficiary' || req.user.role === 'admin';
  const queries = [
    Donation.find({
      donor: userId,
      status: 'succeeded',
    })
      .populate('campaign', 'title coverImage slug')
      .sort({
        createdAt: -1,
      }),
  ];
  if (isBeneficiary) {
    queries.push(
      Campaign.find({
        beneficiary: userId,
      }).sort({
        createdAt: -1,
      })
    );
    try {
      queries.push(
        WithdrawalRequest.find({
          beneficiary: userId,
        })
          .populate('campaign', 'title slug')
          .sort({
            createdAt: -1,
          })
      );
    } catch {
      queries.push(Promise.resolve([]));
    }
  } else {
    queries.push(Promise.resolve([]));
    queries.push(Promise.resolve([]));
  }
  const [donations, campaigns, withdrawals] = await Promise.all(queries);
  res.json({
    success: true,
    data: {
      donations,
      campaigns,
      withdrawals,
    },
  });
});
export const listUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role, search } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        email: {
          $regex: search,
          $options: 'i',
        },
      },
    ];
  }
  const skip = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    User.find(filter)
      .select('-password -refreshToken')
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);
  res.json({
    success: true,
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const allowedRoles = ['donor', 'beneficiary', 'admin'];
  if (!allowedRoles.includes(role)) {
    throw new ApiError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, 400);
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  if (user._id.toString() === req.user._id.toString()) {
    throw new ApiError('Cannot change your own role', 400);
  }
  user.role = role;
  await user.save({
    validateBeforeSave: false,
  });
  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
export const suspendUser = asyncHandler(async (req, res) => {
  const { suspended } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  if (user._id.toString() === req.user._id.toString()) {
    throw new ApiError('Cannot suspend yourself', 400);
  }
  user.isSuspended = Boolean(suspended);
  await user.save({
    validateBeforeSave: false,
  });
  res.json({
    success: true,
    message: suspended ? 'User suspended' : 'User unsuspended',
    data: {
      _id: user._id,
      name: user.name,
      isSuspended: user.isSuspended,
    },
  });
});
export const getMyDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({
    donor: req.user._id,
    status: 'succeeded',
  })
    .populate('campaign', 'title coverImage slug')
    .sort({
      createdAt: -1,
    });
  res.json({
    success: true,
    data: donations,
  });
});
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError('Current and new password are required', 400);
  }
  if (newPassword.length < 6) {
    throw new ApiError('New password must be at least 6 characters', 400);
  }
  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError('Current password is incorrect', 401);
  }
  user.password = newPassword;
  await user.save();
  res.json({
    success: true,
    message: 'Password changed successfully',
  });
});
