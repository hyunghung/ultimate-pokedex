const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  const loggedIn = req.session ? req.session.loggedIn : false;
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/pokedex/:id', (req, res) => {
  const filePath = path.join(__dirname, '../public/pokedex.html');
  res.sendFile(filePath);
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
