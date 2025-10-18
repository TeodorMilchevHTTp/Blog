const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '..', 'build')));

// Make MongoDB connection currently optional
const mongoUri = process.env.MONGODB_URI || '';

// connect to MongoDB
if (mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://')) {
  mongoose.connect(mongoUri)
  .then(async () => {
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

// Catch-all to serve React app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
