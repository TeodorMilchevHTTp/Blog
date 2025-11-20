const express = require('express');
const Post = require('../models/Post'); // Import the Post model

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  console.log('GET request received for all posts');  // Log the GET request
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort posts by createdAt in descending order
    console.log(`Fetched ${posts.length} posts`);  // Log the number of posts fetched
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err.message);  // Log the error
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  console.log('POST request received to create a new post');
  console.log('Received post data:', req.body);  // Log the incoming data from the request body

  const { title, content, category, rating } = req.body;
  try {
    // Validate the incoming data (optional but recommended)
    if (!title || !content || !category || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Creating new post with title:', title);

    const newPost = new Post({ title, content, category, rating });  // Create new post
    await newPost.save();  // Save the new post to the database

    console.log('Post saved successfully:', newPost);  // Log the saved post details
    res.status(201).json(newPost);  // Respond with the saved post
  } catch (err) {
    console.error('Error saving post:', err.message);  // Log the error
    res.status(500).json({ message: 'Error saving post', error: err.message });
  }
});

// PUT (edit) an existing post
router.put('/:id', async (req, res) => {
  console.log(`PUT request received to edit post with ID: ${req.params.id}`);
  console.log('Received post update data:', req.body);  // Log the incoming update data

  const { title, content, category, rating } = req.body;
  try {
    // Validate the incoming data
    if (!title || !content || !category || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category, rating },  // Update fields with new values
      { new: true }  // Return the updated post after update
    );

    if (!updatedPost) {
      console.log(`Post with ID ${req.params.id} not found`);  // Log if post not found
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('Post updated successfully:', updatedPost);  // Log the updated post
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err.message);  // Log the error
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  console.log(`DELETE request received for post with ID: ${req.params.id}`);
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    
    if (!deletedPost) {
      console.log(`Post with ID ${req.params.id} not found`);  // Log if post not found
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('Post deleted successfully:', deletedPost);  // Log the deleted post details
    res.json({ message: 'Post deleted', post: deletedPost });
  } catch (err) {
    console.error('Error deleting post:', err.message);  // Log the error
    res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
});

module.exports = router;
