const mongoose = require('mongoose');
const Book = require('../models/Book');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      description: "A practical guide to building good habits and breaking bad ones, backed by science and psychology.",
      coverImage: "http://localhost:5001/images/atomic-abits.jpeg",
    },
    {
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      description: "A historical and philosophical guide to understanding power dynamics and strategies for influence.",
      coverImage: "http://localhost:5001/images/48laws.jpg",
    },
    {
      title: "How to Talk to Anyone",
      author: "Leil Lowndes",
      description: "Tips and techniques for effective communication and building rapport with people.",
      coverImage: "http://localhost:5001/images/hta.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      description: "A personal finance classic that contrasts two different approaches to money and wealth.",
      coverImage: "http://localhost:5001/images/richdad.jpeg",
    },
  ];

  await Book.insertMany(books);
  mongoose.disconnect();
}).catch(err => console.error("Database connection failed:", err));