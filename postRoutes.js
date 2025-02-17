const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const newPost = new Post({ userId, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username').populate('comments.userId', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a post
router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    if (post.likes.includes(user._id)) {
      return res.status(400).json({ error: 'You have already liked this post' });
    }

    post.likes.push(user._id);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment on a post
router.post('/:id/comments', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = await Post.findById(req.params.id);

    const comment = { userId, content };
    post.comments.push(comment);
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
