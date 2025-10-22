// server/routes/steam.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/games', async (req, res) => {
  try {
    const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Steam games' });
  }
});

module.exports = router;
