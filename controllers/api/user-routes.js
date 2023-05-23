const router = require('express').Router();
const { User } = require('../../models');

// User sign up
router.post('/', async (req, res) => {
  try {
    // Create a new user with the provided username and password
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      // Save user session data
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    // Find the user with the provided username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      // Save user session data
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the user session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;