const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

// Set up routes for '/user' endpoint
router.use('/user', userRoutes);

// Set up routes for '/post' endpoint
router.use('/post', postRoutes);

// Set up routes for '/comment' endpoint
router.use('/comment', commentRoutes);

module.exports = router;