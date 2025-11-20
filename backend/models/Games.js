const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  review: { type: String, default: "" },
  status: { type: String, enum: ["played", "current", "wishlist"], default: "current" },

  // ADD THESE FIELDS
  genres: { type: [String], default: [] },
  releaseDate: { type: String, default: "" },
  rating: { type: Number, default: null },

  appid: String,
  imageUrl: String,
  steam_url: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Game", gameSchema);
