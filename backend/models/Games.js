const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
}, { timestamps: true });

const Games = mongoose.model('Games', gameSchema);

module.exports = Games;