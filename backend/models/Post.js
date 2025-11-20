const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create and export the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
