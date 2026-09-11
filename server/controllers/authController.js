import crypto from 'crypto';
import User from '../models/User.js';
import {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
} from '../utils/generateToken.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

/**
 * Serialize user object for API responses (never leak sensitive fields).
 */
const serializeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  bio: user.bio,
  role: user.role,
  isEmailVerified: user.isEmailVerified,
  stripeOnboardingComplete: user.stripeOnboardingComplete,
  createdAt: user.createdAt,
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user (donor or beneficiary)
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Only allow donor or beneficiary from client — never admin
  const allowedRoles = ['donor', 'beneficiary'];
  const userRole = allowedRoles.includes(role) ? role : 'donor';

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError('User already exists with this email', 400);
  }

  const user = await User.create({ name, email, password, role: userRole });

  // Generate email verification token
  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send verification email
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'NexusFund — Verify your email',
      html: `
        <h2>Welcome to NexusFund!</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}" style="display:inline-block;padding:12px 24px;background:#00f5ff;color:#000;font-weight:bold;text-decoration:none;border-radius:4px;">Verify Email</a>
        <p>This link expires in 24 hours.</p>
      `,
    });
  } catch {
    // Email failure shouldn't block registration
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setTokenCookies(res, accessToken, refreshToken);

  res.status(201).json({
    success: true,
    user: serializeUser(user),
  });
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user & set cookies
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  if (user.isSuspended) {
    throw new ApiError('Account suspended. Contact support.', 403);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setTokenCookies(res, accessToken, refreshToken);

  res.json({
    success: true,
    user: serializeUser(user),
  });
});

/**
 * @route   POST /api/auth/logout
 * @desc    Clear cookies & refresh token
 */
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = undefined;
      await user.save({ validateBeforeSave: false });
    }
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.json({ success: true, message: 'Logged out' });
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh the access token using the refresh token cookie
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new ApiError('No refresh token', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select('+refreshToken');

    if (!user || user.refreshToken !== token) {
      throw new ApiError('Invalid refresh token', 401);
    }

    if (user.isSuspended) {
      throw new ApiError('Account suspended', 403);
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    setTokenCookies(res, newAccessToken, newRefreshToken);

    res.json({ success: true, message: 'Token refreshed' });
  } catch (err) {
    if (err.statusCode) throw err;
    throw new ApiError('Invalid or expired refresh token', 401);
  }
});

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify user's email via token sent in email
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  }).select('+emailVerificationToken +emailVerificationExpires');

  if (!user) {
    throw new ApiError('Invalid or expired verification token', 400);
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  res.json({ success: true, message: 'Email verified successfully' });
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError('Please provide an email', 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal whether user exists
    return res.json({ success: true, message: 'If the email exists, a reset link was sent.' });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'NexusFund — Password Reset',
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#00f5ff;color:#000;font-weight:bold;text-decoration:none;border-radius:4px;">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError('Failed to send reset email. Try again later.', 500);
  }

  res.json({ success: true, message: 'If the email exists, a reset link was sent.' });
});

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password via token
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    throw new ApiError('Password must be at least 6 characters', 400);
  }

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+passwordResetToken +passwordResetExpires');

  if (!user) {
    throw new ApiError('Invalid or expired reset token', 400);
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // Invalidate existing sessions
  user.refreshToken = undefined;
  await user.save();

  res.json({ success: true, message: 'Password reset successful. Please login.' });
});
