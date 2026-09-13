import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getDashboard,
  listUsers,
  updateUserRole,
  suspendUser,
  getMyDonations,
  changePassword,
} from '../controllers/userController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Authenticated user routes
router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);
router.get('/dashboard', protect, getDashboard);
router.get('/me/donations', protect, getMyDonations);
router.put('/me/password', protect, changePassword);

// Keep /profile as alias for backward compatibility
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin routes
router.get('/', protect, requireRole('admin'), listUsers);
router.put('/:id/role', protect, requireRole('admin'), updateUserRole);
router.put('/:id/suspend', protect, requireRole('admin'), suspendUser);

export default router;
