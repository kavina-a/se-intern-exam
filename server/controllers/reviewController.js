const Review = require('../models/Review');


const getReviews = async (req, res) => {
  const { bookId } = req.params; 
  try {
    const reviews = await Review.find({ bookId })
      .populate('bookId', 'title author') 
      .exec();

    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Failed!' });
  }
};


const createReview = async (req, res) => {
  const { bookId } = req.params; 
  const { reviewText, rating } = req.body; 
  const userId = req.user.id; 

  try {
    const review = await Review.create({ bookId, reviewText, rating, userId }); 
    res.status(201).json(review); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyReviews = async (req, res) => {
  const userId = req.user.id; 
  const { bookId } = req.params; 

  try {
    const reviews = await Review.find({ userId, bookId })
      .populate('bookId', 'title author')
      .exec();

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book by this user' });
    }

    res.status(200).json(reviews); 
  } catch (err) {
    console.error('Error fetching user reviews for book:', err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

const editReview = async (req, res) => {

  const { reviewId } = req.params;
  const { reviewText, rating } = req.body;
  const userId = req.user.id; 

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only edit your own reviews' });
    }

    review.reviewText = reviewText;
    review.rating = rating;

    await review.save(); 
    res.status(200).json(review);  // Send back the updated review
  } catch (err) {
    res.status(500).json({ message: 'Failed to edit review' });
};
};

const deleteReview = async (req, res) => {

  const { reviewId } = req.params;
  
  try {
    await Review.findById(reviewId);

    await Review.deleteOne({ _id: reviewId }); // findbyiddelete method can be used too 
    
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getReviews, createReview, getMyReviews, editReview, deleteReview };