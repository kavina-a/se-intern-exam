const express = require('express');
const { getBooks, getBookDetails } = require('../controllers/bookController');
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookDetails); //check cause last time we used the : and didnt work

module.exports = router;