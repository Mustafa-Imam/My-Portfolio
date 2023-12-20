var express = require('express');
var router = express.Router();
const passport = require('passport');
let userModel = require('../models/user');
let User = userModel.User;

// Nav Bar Routes
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Home', displayName: req.user ? req.user.displayName : '' });
});
router.get('/aboutme', function(req, res, next) {
    res.render('aboutme', { title: 'About Me', displayName: req.user ? req.user.displayName : '' });
});
router.get('/projects', function(req, res, next) {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : '' });
});
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : '' });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
