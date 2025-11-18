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

// MongoDB URI from environment
const mongoUri = process.env.MONGODB_URI || '';

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

// Games routes (can fallback to in-memory if MongoDB fails)
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

const cvRouter = require('./routes/cv');
app.use('/api/cv', cvRouter);

// Serve React static files
app.use(express.static(path.join(__dirname, '..', 'build')));

// Catch-all to serve React index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// --- MongoDB connection and server start ---
async function startServer() {
  if (mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://')) {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.warn('MongoDB connection failed. Running in-memory mode:', err.message);
    }

    mongoose.connection.on('error', (err) => {
      console.warn('MongoDB connection error:', err.message);
    });
  } else {
    console.log('No MongoDB URI found. Running in-memory mode.');
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Start the server
startServer();
