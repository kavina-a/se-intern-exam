const express = require('express');
const { createReview, editReview,getMyReviews, deleteReview, getReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:bookId', authMiddleware, getReviews);
// router.get('/:userId', authMiddleware, getMyReviews);
router.get('/book/:bookId/user', authMiddleware, getMyReviews);
router.post('/:bookId', authMiddleware, createReview);
router.put('/:reviewId', authMiddleware,  editReview);
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;

