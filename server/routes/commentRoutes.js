import { Router } from 'express';
import { createComment, getComments, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/:campaignId', protect, createComment);
router.get('/:campaignId', getComments);
router.delete('/:id', protect, deleteComment);

export default router;
