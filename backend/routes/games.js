// routes/games.js
const express = require('express');
const router = express.Router();
const Game = require('../models/Games');

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new game
router.post('/', async (req, res) => {
  try {
    const { title, review, appid, imageUrl } = req.body;
    const newGame = new Game({ title, review, appid, imageUrl });
    await newGame.save();
    res.status(201).json(newGame);
    console.log('New game added:', newGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a game's review/opinion
router.put('/:id', async (req, res) => {
  try {
    const { review } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { review },
      { new: true }
    );
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a game
router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
