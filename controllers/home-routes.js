const router = require('express').Router();
const { user } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});


router.get('/pokedex/:id', withAuth, async (req, res) => {

});




router.get('/login', withAuth, (req, res) => {
  res.render('login');
});

module.exports = userController;
