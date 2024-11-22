//MODULES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path')

dotenv.config();
const app = express();

//APP 
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//ROUTES
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Database Connection Failed", err));

//LISTENER
app.listen(5001, () => console.log("Server running on port 5001"));

