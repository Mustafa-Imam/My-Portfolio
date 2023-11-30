var express = require('express');
var router = express.Router();
const carController = require('../controllers/cars');
let mongoose = require('mongoose');

// Helper function for authentication
function requireAuthentication(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// Get router for Read Operation
router.get('/', carController.ReadcarData);

// Get router for Create Operation --> Display the add car page
router.get('/add', requireAuthentication, carController.DisplayAddcar);

// Post router for Create Operation --> Process the add car page
router.post('/add', requireAuthentication, carController.Addcar);

// Get router for Edit/Update Operation --> Display the edit car page
router.get('/edit/:id', requireAuthentication, carController.DisplayEditcar);

// Post router for Edit/Update Operation --> Process the edit car page
router.post('/edit/:id', requireAuthentication, carController.Editcar);

// Get router for Delete Operation
router.get('/delete/:id', requireAuthentication, carController.Deletecar);

module.exports = router;
