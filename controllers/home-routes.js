const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// Route to display all posts on the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all posts and include the associated User data for each post
    const postData = await Post.findAll({
      include: [User],
    });

    // Serialize the post data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'all-posts-admin' template with the posts data and loggedIn status
    res.render('all-posts-admin', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display a single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // Find the post data for the provided post ID, including associated User and Comment data
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // Serialize the post data
      const post = postData.get({ plain: true });
      console.log(post);

      // Render the 'single-post' template with the post data and loggedIn status
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;