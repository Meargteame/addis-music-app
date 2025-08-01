const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const songRoutes = require('./routes/songs.routes');
const userRoutes = require('./routes/user.routes');
const statsRoutes = require('./routes/stats.routes');
const responseWrapper = require('./middleware/responseWrapper');
const User = require('./models/user.model'); // Import the User model

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(responseWrapper);

// Mount API routes
app.use('/api/songs', songRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stats', statsRoutes);

// Simple test route to check DB connection
app.get('/ping-db', async (req, res) => {
  try {
    const user = await User.findOne();
    if (user) {
      res.success(user, 'Successfully fetched a user, DB is connected.');
    } else {
      res.success(null, 'DB is connected, but no users found.');
    }
  } catch (error) {
    res.error('DB connection error: ' + error.message, 500);
  }
});

// The frontend expects a 204 for favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).send());

// Handle 404 routes
app.use('*', (req, res) => {
  res.error('Route not found', 404);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log('🎵 AddisMusic Express Backend Server');
  console.log('=====================================');
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
  console.log('🌐 CORS enabled for all origins');
  console.log('📝 API Base URL: http://127.0.0.1:' + PORT + '/api');
  console.log('=====================================');
});

module.exports = app;
