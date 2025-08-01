const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  role: String,
  location: String,
  bio: String,
  avatar: String,
  join_date: Date,
  favorite_genres: [String],
  stats: {
    total_songs_added: Number,
    total_favorites: Number,
    total_plays: Number,
    member_since: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
