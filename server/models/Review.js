const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // referencing to the Book collection since we can get the author name and book title from that iself , data redundancy
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewText: { type: String, required: true }, 
  rating: { type: Number, min: 1, max: 5, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Review', reviewSchema);