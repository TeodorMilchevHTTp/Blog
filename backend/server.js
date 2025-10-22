const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import fetch for Node <18
const fetch = require('node-fetch');

const apiKey = process.env.FAST_FOREX_API_KEY;
console.log("FAST_FOREX_API_KEY loaded:", apiKey ? "Yes" : "No");

// Make MongoDB connection currently optional
const mongoUri = process.env.MONGODB_URI || '';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// connect to MongoDB
if (mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://')) {
  mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.warn('MongoDB connection error, app will continue without database:', err.message);
  });
} else {
  console.log('Running without MongoDB - using in-memory data for development');
}

// --- API routes should come BEFORE static and catch-all ---

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

app.get('/api/rates', async (req, res) => {
  try {
    // Fetch USD-based rates
    const usdRes = await fetch(`https://api.fastforex.io/fetch-multi?from=USD&to=EUR,GBP,JPY&api_key=${apiKey}`);
    const usdData = await usdRes.json();

    // Fetch BGN-based rates
    const bgnRes = await fetch(`https://api.fastforex.io/fetch-multi?from=BGN&to=EUR,GBP,JPY&api_key=${apiKey}`);
    const bgnData = await bgnRes.json();

    console.log('USD data:', usdData);
    console.log('BGN data:', bgnData);

    // Respond in the format the frontend expects
    res.json({
      usd: usdData.results || {},
      bgn: bgnData.results || {}
    });
  } catch (err) {
    console.error('Failed to fetch exchange rates:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Games router
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '..', 'build')));

// Catch-all handler to serve React's index.html for any other routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
