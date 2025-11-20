const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Game = require('../models/Games');
const auth = require('../middleware/auth');
// ---------------------
// MongoDB CRUD Routes
// ---------------------

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
    // destructure all possible fields sent from the client
    const { title, review, imageUrl, status, steam_url, genres, releaseDate, rating } = req.body;

    const newGame = new Game({
      title,
      review: review || '',
      imageUrl,
      steam_url: steam_url || '',
      status: status || 'current',
      genres: genres || [],
      releaseDate: releaseDate || '',
      rating: rating || null,
    });

    await newGame.save();
    res.status(201).json(newGame);

    console.log('New game added:', newGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update review
router.put('/:id/review', async (req, res) => {
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

// Update status (move game between columns)
router.put('/:id', auth, async (req, res) => {
  try {
    if(req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    const { status, review } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (review !== undefined) updateFields.review = review;

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete a game
router.delete('/:id', auth, async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------
// RAWG API Route
// ---------------------

router.get('/rawg', async (req, res) => {
  try {
    const apiKey = process.env.RAWG_API_KEY;
    const searchQuery = req.query.search || '';
    const pageSize = 20;

    const searchUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=${pageSize}&search=${encodeURIComponent(searchQuery)}`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    const enriched = await Promise.all(
      data.results.map(async (game) => {
        const detailsRes = await fetch(
          `https://api.rawg.io/api/games/${game.id}?key=${apiKey}`
        );
        const details = await detailsRes.json();

        const steamStore = details.stores?.find(
          (s) => s.store.name === "Steam"
        );

        return {
          ...game,
          steam_url: steamStore ? steamStore.url : "",
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RAWG games" });
  }
});

module.exports = router;
