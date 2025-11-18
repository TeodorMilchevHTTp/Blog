// models/Games.js
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ['played', 'current', 'wishlist'],
    default: 'current'
  },
  appid: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Game", gameSchema);
