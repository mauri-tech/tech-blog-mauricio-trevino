const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// Route to display all posts in the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all posts from the database for the logged-in user
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User]
    });

    // Serialize the post data
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Render the 'all-posts' template with the posts data and dashboard layout
    res.render('all-posts', {
      layout: 'dashboard',
      posts
    });
  } catch (err) {
    res.redirect('login');
  }
});

// Route to display the form for creating a new post
router.get('/new', withAuth, (req, res) => {
  // Render the 'new-post' template with the dashboard layout
  res.render('new-post', {
    layout: 'dashboard'
  });
});

// Route to display the form for editing a post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find the post data for the provided post ID
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // Serialize the post data
      const post = postData.get({ plain: true });
      console.log(post);

      // Render the 'edit-post' template with the post data and dashboard layout
      res.render('edit-post', {
        layout: 'dashboard',
        post
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;