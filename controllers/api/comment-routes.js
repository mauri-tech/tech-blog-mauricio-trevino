const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all comment data including associated User data
    const commentData = await Comment.findAll({
      include: [User],
    });

    // Serialize the comment data
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);

    // Render the 'single-post' template with comments and loggedIn status
    res.render('single-post', { comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    // Create a new comment with the provided body and associated userId
    const newComment = await Comment.create({
      ...body,
      userId: req.session.userId,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;