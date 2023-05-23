const { Post } = require('../models');

// Array of post data to be seeded
const postdata = [
  {
    postTitle: "A Wonderful Day",
    postContent: "This is a beautiful day",
    userId: 1
  },
  {
    postTitle: "Picturesque Fields",
    postContent: "This is the greenest field",
    userId: 2
  },
  {
    postTitle: "The Melody of Nature",
    postContent: "This is very musical, listen!",
    userId: 3
  }
];

// Function to seed post data
const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;