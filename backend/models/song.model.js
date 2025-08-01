const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: String,
  genre: String,
  duration: String,
  year: Number,
  cover_image: String,
  play_count: { type: Number, default: 0 },
  date_added: { type: Date, default: Date.now },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
