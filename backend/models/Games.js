const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    review: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Games', gameSchema);
