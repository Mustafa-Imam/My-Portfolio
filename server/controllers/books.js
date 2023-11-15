var express = require('express');
var router = express.Router();
const books = require('../models/books');

// Get router for Read Operation
module.exports.ReadBookData = async (req, res, next) => {
    try {
        const booksList = await books.find();
        res.render("book/list", {
            title: "My Book List",
            booksList: booksList
        });
    } catch (err) {
        console.error(err);
        res.render("book/list", {
            error: "Server Error"
        });
    }
};

// Get router for Create Operation --> Display the add book page
module.exports.DisplayAddBook = (req, res, next) => {
    res.render('book/add', {
        title: 'Add Book'
    });
};

// Post router for Create Operation --> Process the add book page
module.exports.AddBook = async (req, res, next) => {
    try {
        let newBook = new books({
            "Name": req.body.Name,
            "Author": req.body.Author,
            "Published": req.body.Published,
            "Description": req.body.Description,
            "Price": req.body.Price
        });
        await books.create(newBook);
        res.redirect('/booklist');
    } catch (err) {
        console.error(err);
        res.render("book/list", {
            error: "Server Error"
        });
    }
};

// Get router for Edit/Update Operation --> Display the edit book page
module.exports.DisplayEditBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        const BooktoEdit = await books.findById(id);
        res.render('book/edit', {
            title: 'Edit Book',
            Book: BooktoEdit
        });
    } catch (err) {
        console.error(err);
        res.render("book/list", {
            error: "Server Error"
        });
    }
};

// Post router for Edit/Update Operation --> Process the edit book page
module.exports.EditBook = (req, res, next) => {
    // Implementation for updating a book by id
};

// Get router for Delete Operation
module.exports.DeleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        await books.findByIdAndDelete(id);
        res.redirect("/booklist");
    } catch (err) {
        console.error(err);
        res.render("book/list", {
            error: "Server Error"
        });
    }
};

// Assigning the individual routes to the router
router.get('/', module.exports.ReadBookData);
router.get('/add', module.exports.DisplayAddBook);
router.post('/add', module.exports.AddBook);
router.get('/edit/:id', module.exports.DisplayEditBook);
router.post('/edit/:id', module.exports.EditBook);
router.get('/delete/:id', module.exports.DeleteBook);

module.exports.router = router;
