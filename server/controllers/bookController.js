const Book = require('../models/Book');
const Review = require('../models/Review');


const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    const reviews = await Review.find({ bookId: book._id });

    const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

    res.json({book, averageRating: averageRating.toFixed(2)});
  } catch (err) {
    res.status(404).json({ error: "Book not found!" });
  }
};

module.exports = {getBooks, getBookDetails}