var express = require('express');
var router = express.Router();
const cars = require('../models/cars');

// Get router for Read Operation
module.exports.ReadcarData = async (req, res, next) => {
    try {
        const carcollection = await cars.find();
        res.render("car/collection", {
            title: "Car Collection",
            carcollection: carcollection
        });
    } catch (err) {
        console.error(err);
        res.render("car/collection", {
            error: "Server Error"
        });
    }
};

// Get router for Create Operation --> Display the add car page
module.exports.DisplayAddcar = (req, res, next) => {
    res.render('car/add', {
        title: 'Add car'
    });
};

// Post router for Create Operation --> Process the add car page
module.exports.Addcar = async (req, res, next) => {
    try {
        let newcar = new cars({
            "Make": req.body.Make,
            "Model": req.body.Model,
            "Year": req.body.Year,
            "Colour": req.body.Colour,
            "Price": req.body.Price
        });
        await cars.create(newcar);
        res.redirect('/carcollection');
    } catch (err) {
        console.error(err);
        res.render("car/collection", {
            error: "Server Error"
        });
    }
};

// Get router for Edit/Update Operation --> Display the edit car page
module.exports.DisplayEditcar = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cartoEdit = await cars.findById(id);
        res.render('car/edit', {
            title: 'Edit car',
            car: cartoEdit
        });
    } catch (err) {
        console.error(err);
        res.render("car/collection", {
            error: "Server Error"
        });
    }
};

// Post router for Edit/Update Operation --> Process the edit car page
module.exports.Editcar = (req, res, next) => {
    // Implementation for updating a car by id
};

// Get router for Delete Operation
module.exports.Deletecar = async (req, res, next) => {
    try {
        const id = req.params.id;
        await cars.findByIdAndDelete(id);
        res.redirect("/carcollection");
    } catch (err) {
        console.error(err);
        res.render("car/collection", {
            error: "Server Error"
        });
    }
};

// Assigning the individual routes to the router
router.get('/', module.exports.ReadcarData);
router.get('/add', module.exports.DisplayAddcar);
router.post('/add', module.exports.Addcar);
router.get('/edit/:id', module.exports.DisplayEditcar);
router.post('/edit/:id', module.exports.Editcar);
router.get('/delete/:id', module.exports.Deletecar);

module.exports.router = router;
