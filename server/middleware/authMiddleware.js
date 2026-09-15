import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';
export const protect = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError('Not authorized — no token', 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      throw new ApiError('User not found', 401);
    }
    if (req.user.isSuspended) {
      throw new ApiError('Account suspended', 403);
    }
    next();
  } catch (error) {
    if (error.statusCode) throw error;
    if (error.name === 'TokenExpiredError') {
      throw new ApiError('Token expired', 401);
    }
    throw new ApiError('Not authorized — invalid token', 401);
  }
});
export const optionalAuth = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (user && !user.isSuspended) {
      req.user = user;
    } else {
      req.user = null;
    }
  } catch {
    req.user = null;
  }
  next();
});
export const requireRole = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      throw new ApiError('Not authorized', 401);
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(`Access denied. Required role: ${roles.join(' or ')}`, 403);
    }
    next();
  };
};
export const authorize = requireRole;
