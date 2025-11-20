const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URI from environment
const mongoUri = process.env.MONGODB_URI || '';

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

const cvRequestRouter = require('./routes/cv');  // Adjust the path based on your project structure
app.use('/api/cv', cvRequestRouter);

// Post routes (GET, POST, PUT, DELETE)
const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter);

const gameRouter = require('./routes/games');
app.use('/games', gameRouter);  // Make sure this is correctly set

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
