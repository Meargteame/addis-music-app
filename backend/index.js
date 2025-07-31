const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for mock data
let songs = [];
let user = null;
let nextSongId = 1;

// Helper functions for standardized responses
const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    data: data,
    message: message
  };
};

const errorResponse = (error, code = 400) => {
  return {
    success: false,
    error: error,
    code: code
  };
};

// Generate mock song data
const generateMockSong = (index = 0) => {
  const titles = [
    'Tizita',
    'Yene Konjo',
    'New Day', 
    'Addis Groove',
    'Sheger',
    'Ethio Jazz Fusion',
    'Modern Habesha',
    'Digital Ethiopia',
    'Bahir Dar Blues',
    'Gondar Nights'
  ];
  
  const artists = [
    'Mahmoud Ahmed',
    'Aster Aweke', 
    'Teddy Afro',
    'Mulatu Astatke',
    'Gigi',
    'Tilahun Gessesse',
    'Ephrem Tamiru',
    'Betty G',
    'Dawit Tsige',
    'Neway Debebe'
  ];
  
  const albums = [
    'Soul of Addis',
    'Hagere',
    'Hope',
    'Ethio Jazz',
    'Gold & Wax',
    'Classic Collection',
    'New Generation',
    'Digital Roots',
    'Lake Side Sessions',
    'Royal Sessions'
  ];
  
  const genres = ['pop', 'rock', 'hiphop', 'jazz', 'electronic', 'classical'];
  
  const minutes = Math.floor(Math.random() * 4) + 2; // 2-5 minutes
  const seconds = Math.floor(Math.random() * 60);
  const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 365));
  
  return {
    id: nextSongId++,
    title: titles[index % titles.length] || `Song ${index + 1}`,
    artist: artists[index % artists.length] || `Artist ${index + 1}`,
    album: albums[index % albums.length] || `Album ${index + 1}`,
    genre: genres[Math.floor(Math.random() * genres.length)],
    duration: duration,
    year: Math.floor(Math.random() * 30) + 1995, // 1995-2024
    cover_image: `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`,
    audio_file: null,
    lyrics: 'Mock lyrics content for this beautiful Ethiopian song...',
    play_count: Math.floor(Math.random() * 10000),
    date_added: date.toISOString()
  };
};

// Generate mock user data
const generateMockUser = () => {
  return {
    id: 1,
    name: 'Music Lover',
    email: 'user@addismusic.com',
    role: 'Music Enthusiast',
    location: 'Addis Ababa, Ethiopia',
    bio: 'Passionate about Ethiopian music and discovering new artists',
    avatar: 'https://picsum.photos/150/150?random=user',
    join_date: new Date('2023-01-15').toISOString(),
    favorite_genres: ['jazz', 'pop', 'traditional'],
    stats: {
      total_songs_added: 15,
      total_favorites: 8,
      total_plays: 1250,
      member_since: '2023-01-15'
    }
  };
};

// Initialize mock data
const initializeMockData = () => {
  console.log('Initializing mock data...');
  
  // Create initial songs
  for (let i = 0; i < 12; i++) {
    songs.push(generateMockSong(i));
  }
  
  // Create user
  user = generateMockUser();
  
  console.log(`Created ${songs.length} songs and 1 user`);
};

// API Routes

// GET /api/songs - List songs with filtering and pagination
app.get('/api/songs', (req, res) => {
  try {
    let filteredSongs = [...songs];
    const { genre, search, limit = '20', offset = '0' } = req.query;

    // Filter by genre
    if (genre) {
      filteredSongs = filteredSongs.filter(song => 
        song.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    // Search in title, artist, album
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredSongs = filteredSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        (song.album && song.album.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by date_added (newest first)
    filteredSongs.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

    const response = successResponse({
      songs: paginatedSongs,
      pagination: {
        total: filteredSongs.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        has_more: endIndex < filteredSongs.length
      }
    }, `Retrieved ${paginatedSongs.length} songs`);

    res.json(response);
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// GET /api/songs/:id - Get single song
app.get('/api/songs/:id', (req, res) => {
  try {
    const songId = parseInt(req.params.id);
    const song = songs.find(s => s.id === songId);
    
    if (!song) {
      return res.status(404).json(errorResponse('Song not found', 404));
    }
    
    res.json(successResponse(song, 'Song retrieved successfully'));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// POST /api/songs - Create new song
app.post('/api/songs', (req, res) => {
  try {
    const songData = req.body;
    
    // Validate required fields
    if (!songData.title || !songData.artist) {
      return res.status(400).json(errorResponse('Title and artist are required', 400));
    }
    
    const newSong = {
      id: nextSongId++,
      title: songData.title,
      artist: songData.artist,
      album: songData.album || '',
      genre: songData.genre || 'pop',
      duration: songData.duration || '3:30',
      year: songData.year || new Date().getFullYear(),
      cover_image: songData.cover_image || `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`,
      audio_file: songData.audio_file || null,
      lyrics: songData.lyrics || 'Mock lyrics content for this beautiful Ethiopian song...',
      play_count: 0,
      date_added: new Date().toISOString()
    };
    
    songs.unshift(newSong); // Add to beginning for newest first
    
    res.status(201).json(successResponse(
      newSong,
      `Song "${newSong.title}" by ${newSong.artist} created successfully`
    ));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// PUT /api/songs/:id - Update song
app.put('/api/songs/:id', (req, res) => {
  try {
    const songId = parseInt(req.params.id);
    const songIndex = songs.findIndex(s => s.id === songId);
    
    if (songIndex === -1) {
      return res.status(404).json(errorResponse('Song not found', 404));
    }
    
    const updatedSong = {
      ...songs[songIndex],
      ...req.body,
      id: songId // Ensure ID doesn't change
    };
    
    songs[songIndex] = updatedSong;
    
    res.json(successResponse(
      updatedSong,
      `Song "${updatedSong.title}" updated successfully`
    ));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// DELETE /api/songs/:id - Delete song
app.delete('/api/songs/:id', (req, res) => {
  try {
    const songId = parseInt(req.params.id);
    const songIndex = songs.findIndex(s => s.id === songId);
    
    if (songIndex === -1) {
      return res.status(404).json(errorResponse('Song not found', 404));
    }
    
    const deletedSong = songs[songIndex];
    songs.splice(songIndex, 1);
    
    res.json(successResponse(
      { deleted_song_id: songId },
      `Song "${deletedSong.title}" by ${deletedSong.artist} deleted successfully`
    ));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// POST /api/songs/:id/play - Increment play count
app.post('/api/songs/:id/play', (req, res) => {
  try {
    const songId = parseInt(req.params.id);
    const song = songs.find(s => s.id === songId);
    
    if (!song) {
      return res.status(404).json(errorResponse('Song not found', 404));
    }
    
    song.play_count = (song.play_count || 0) + 1;
    
    res.json(successResponse(
      {
        song_id: songId,
        play_count: song.play_count
      },
      `Play count updated for "${song.title}"`
    ));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// GET /api/user - Get user profile
app.get('/api/user', (req, res) => {
  try {
    if (!user) {
      return res.status(404).json(errorResponse('User not found', 404));
    }
    
    res.json(successResponse(user, 'User profile retrieved successfully'));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// GET /api/stats - Get application statistics
app.get('/api/stats', (req, res) => {
  try {
    // Calculate stats
    const totalSongs = songs.length;
    const artists = [...new Set(songs.map(song => song.artist))];
    const totalArtists = artists.length;
    
    // Count songs by genre
    const genreCounts = songs.reduce((acc, song) => {
      acc[song.genre] = (acc[song.genre] || 0) + 1;
      return acc;
    }, {});
    
    // Get popular genres (sorted by count)
    const popularGenres = Object.entries(genreCounts)
      .sort(([,a], [,b]) => b - a)
      .reduce((acc, [genre, count]) => {
        acc[genre] = count;
        return acc;
      }, {});
    
    const stats = {
      total_songs: totalSongs,
      total_artists: totalArtists,
      popular_genres: popularGenres,
      total_plays: songs.reduce((sum, song) => sum + (song.play_count || 0), 0),
      newest_song: songs.sort((a, b) =>
        new Date(b.date_added) - new Date(a.date_added)
      )[0]?.title || null,
      user_stats: user?.stats || {}
    };
    
    res.json(successResponse(stats, 'Statistics retrieved successfully'));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// GET /api/songs/genres - Get available genres
app.get('/api/songs/genres', (req, res) => {
  try {
    const availableGenres = ['pop', 'rock', 'hiphop', 'jazz', 'electronic', 'classical'];
    
    res.json(successResponse(
      availableGenres,
      'Available genres retrieved successfully'
    ));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// GET /api/songs/search - Advanced search (alternative endpoint)
app.get('/api/songs/search', (req, res) => {
  try {
    let filteredSongs = [...songs];
    const { q, genre, artist, year } = req.query;
    
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredSongs = filteredSongs.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        (song.album && song.album.toLowerCase().includes(searchTerm)) ||
        (song.lyrics && song.lyrics.toLowerCase().includes(searchTerm))
      );
    }
    
    if (genre) {
      filteredSongs = filteredSongs.filter(song => 
        song.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    
    if (artist) {
      filteredSongs = filteredSongs.filter(song =>
        song.artist.toLowerCase().includes(artist.toLowerCase())
      );
    }
    
    if (year) {
      filteredSongs = filteredSongs.filter(song => song.year === parseInt(year));
    }
    
    res.json(successResponse(
      filteredSongs,
      `Found ${filteredSongs.length} songs matching search criteria`
    ));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// Admin routes for testing and data management

// POST /api/admin/reset - Reset all data to initial state
app.post('/api/admin/reset', (req, res) => {
  try {
    songs = [];
    nextSongId = 1;
    initializeMockData();
    
    res.json(successResponse(
      {
        songs_count: songs.length,
        message: 'All data reset to initial state'
      },
      'Database reset successfully'
    ));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// GET /api/admin/storage-info - Get storage info
app.get('/api/admin/storage-info', (req, res) => {
  try {
    const storageInfo = {
      songs_in_storage: songs.length,
      user_in_storage: !!user,
      total_memory_usage: JSON.stringify({ songs, user }).length,
      server_uptime: process.uptime()
    };
    
    res.json(successResponse(storageInfo, 'Storage information retrieved'));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json(errorResponse('Internal server error', 500));
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json(errorResponse('Route not found', 404));
});

// Initialize data and start server
initializeMockData();

app.listen(PORT, () => {
  console.log('🎵 AddisMusic Express Backend Server');
  console.log('=====================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Mock data: ${songs.length} songs, 1 user`);
  console.log('🌐 CORS enabled for all origins');
  console.log('📝 API Base URL: http://localhost:' + PORT + '/api');
  console.log('=====================================');
  console.log('Available endpoints:');
  console.log('  GET    /api/songs');
  console.log('  GET    /api/songs/:id');
  console.log('  POST   /api/songs');
  console.log('  PUT    /api/songs/:id');
  console.log('  DELETE /api/songs/:id');
  console.log('  POST   /api/songs/:id/play');
  console.log('  GET    /api/user');
  console.log('  GET    /api/stats');
  console.log('  GET    /api/songs/genres');
  console.log('  GET    /api/songs/search');
  console.log('  POST   /api/admin/reset');
  console.log('  GET    /api/admin/storage-info');
  console.log('=====================================');
});

module.exports = app;
