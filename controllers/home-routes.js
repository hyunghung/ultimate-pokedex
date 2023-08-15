const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('layouts/main'); 
});

router.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/pokedex/:id', (req, res) => {
  const filePath = path.join(__dirname, '../public/pokedex.html');
  res.sendFile(filePath);
});

router.get('/login', (req, res) => {
  const loggedIn = req.session.loggedIn || false;
  res.render('login', { layout: false, loggedIn }); 
});

module.exports = router;
