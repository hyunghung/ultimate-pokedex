const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Team } = require('../../models');

// New user
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userData = await User.create({
      name,
      email,
      password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'You are now signed up and logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      res
        .status(500)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) {
      res
        .status(500)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(async () => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    
      const teams = await Team.findAll({ where: { user_id: userData.id } });
      req.session.teams = teams;
    
      res.redirect('/homepage');
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;
