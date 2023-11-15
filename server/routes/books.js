var express = require('express');
var router = express.Router();
const bookController = require('../controllers/books');

// Get router for Read Operation
router.get('/', bookController.ReadBookData);

// Get router for Create Operation --> Display the add book page
router.get('/add', bookController.DisplayAddBook);

// Post router for Create Operation --> Process the add book page
router.post('/add', bookController.AddBook);

// Get router for Edit/Update Operation --> Display the edit book page
router.get('/edit/:id', bookController.DisplayEditBook);

// Post router for Edit/Update Operation --> Process the edit book page
router.post('/edit/:id', bookController.EditBook);

// Get router for Delete Operation
router.get('/delete/:id', bookController.DeleteBook);

module.exports = router;
