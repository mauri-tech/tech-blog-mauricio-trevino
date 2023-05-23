const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    // Create a new post with the provided body and associated userId
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    console.log("Here is the new post: ", newPost);
    res.json(newPost);
  } catch (err) {
    console.log('IT FAILED!', err);
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('here is the req.body', req.body);
    // Update the post with the provided body
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the post with the provided id
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
