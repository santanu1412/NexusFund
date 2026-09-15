import { Router } from 'express';
import {
  register,
  login,
  logout,
  refreshAccessToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';
const router = Router();
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.post('/refresh', refreshAccessToken);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', authLimiter, resetPassword);
export default router;
