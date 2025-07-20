import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize database
const file = join(__dirname, '../data/songs.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { songs: [] });

// Initialize database with default data
await db.read();
if (!db.data) {
  db.data = { songs: [] };
  await db.write();
}

const router = express.Router();

// Helper function to generate ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Helper function for pagination
const paginate = (array, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return array.slice(startIndex, endIndex);
};

// GET /api/songs - Get all songs with pagination and search
router.get('/', async (req, res) => {
  try {
    await db.read();
    
    const { 
      page = 1, 
      limit = 12, 
      search = '', 
      genre = '', 
      year = '',
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    let songs = [...db.data.songs];

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      songs = songs.filter(song => 
        song.title.toLowerCase().includes(searchLower) ||
        song.artist.toLowerCase().includes(searchLower) ||
        song.album?.toLowerCase().includes(searchLower) ||
        song.genre?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by genre
    if (genre) {
      songs = songs.filter(song => 
        song.genre?.toLowerCase() === genre.toLowerCase()
      );
    }

    // Filter by year
    if (year) {
      songs = songs.filter(song => song.year === parseInt(year));
    }

    // Sorting
    songs.sort((a, b) => {
      let aValue = a[sortBy] || '';
      let bValue = b[sortBy] || '';
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      }
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const total = songs.length;
    const totalPages = Math.ceil(total / limitNum);
    const paginatedSongs = paginate(songs, pageNum, limitNum);

    res.json({
      data: paginatedSongs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// GET /api/songs/:id - Get single song
router.get('/:id', async (req, res) => {
  try {
    await db.read();
    const song = db.data.songs.find(s => s.id === req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json(song);
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ error: 'Failed to fetch song' });
  }
});

// POST /api/songs - Create new song
router.post('/', async (req, res) => {
  try {
    const { title, artist, album, genre, year, duration, albumCover, description } = req.body;
    
    // Validation
    if (!title || !artist) {
      return res.status(400).json({ 
        error: 'Validation failed',
        message: 'Title and artist are required'
      });
    }

    // Check for duplicate
    await db.read();
    const existingSong = db.data.songs.find(
      s => s.title.toLowerCase() === title.toLowerCase() && 
           s.artist.toLowerCase() === artist.toLowerCase()
    );
    
    if (existingSong) {
      return res.status(409).json({ 
        error: 'Song already exists',
        message: 'A song with this title and artist already exists'
      });
    }
    
    const newSong = {
      id: generateId(),
      title: title.trim(),
      artist: artist.trim(),
      album: album?.trim() || null,
      genre: genre?.trim() || null,
      year: year ? parseInt(year) : null,
      duration: duration ? parseInt(duration) : null,
      albumCover: albumCover?.trim() || null,
      description: description?.trim() || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.data.songs.unshift(newSong);
    await db.write();
    
    res.status(201).json(newSong);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Failed to create song' });
  }
});

// PUT /api/songs/:id - Update song
router.put('/:id', async (req, res) => {
  try {
    await db.read();
    const songIndex = db.data.songs.findIndex(s => s.id === req.params.id);
    
    if (songIndex === -1) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    const { title, artist, album, genre, year, duration, albumCover, description } = req.body;
    
    // Validation
    if (!title || !artist) {
      return res.status(400).json({ 
        error: 'Validation failed',
        message: 'Title and artist are required'
      });
    }

    // Check for duplicate (excluding current song)
    const existingSong = db.data.songs.find(
      s => s.id !== req.params.id &&
           s.title.toLowerCase() === title.toLowerCase() && 
           s.artist.toLowerCase() === artist.toLowerCase()
    );
    
    if (existingSong) {
      return res.status(409).json({ 
        error: 'Song already exists',
        message: 'A song with this title and artist already exists'
      });
    }
    
    const updatedSong = {
      ...db.data.songs[songIndex],
      title: title.trim(),
      artist: artist.trim(),
      album: album?.trim() || null,
      genre: genre?.trim() || null,
      year: year ? parseInt(year) : null,
      duration: duration ? parseInt(duration) : null,
      albumCover: albumCover?.trim() || null,
      description: description?.trim() || null,
      updatedAt: new Date().toISOString()
    };
    
    db.data.songs[songIndex] = updatedSong;
    await db.write();
    
    res.json(updatedSong);
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Failed to update song' });
  }
});

// DELETE /api/songs/:id - Delete song
router.delete('/:id', async (req, res) => {
  try {
    await db.read();
    const songIndex = db.data.songs.findIndex(s => s.id === req.params.id);
    
    if (songIndex === -1) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    const deletedSong = db.data.songs[songIndex];
    db.data.songs.splice(songIndex, 1);
    await db.write();
    
    res.json({ 
      message: 'Song deleted successfully',
      song: deletedSong
    });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ error: 'Failed to delete song' });
  }
});

// GET /api/songs/stats/summary - Get songs statistics
router.get('/stats/summary', async (req, res) => {
  try {
    await db.read();
    const songs = db.data.songs;
    
    const stats = {
      totalSongs: songs.length,
      totalArtists: new Set(songs.map(s => s.artist.toLowerCase())).size,
      totalAlbums: new Set(songs.filter(s => s.album).map(s => s.album.toLowerCase())).size,
      totalGenres: new Set(songs.filter(s => s.genre).map(s => s.genre.toLowerCase())).size,
      totalDuration: songs.reduce((acc, song) => acc + (song.duration || 0), 0),
      genreDistribution: {},
      yearDistribution: {}
    };
    
    // Genre distribution
    songs.forEach(song => {
      if (song.genre) {
        stats.genreDistribution[song.genre] = (stats.genreDistribution[song.genre] || 0) + 1;
      }
    });
    
    // Year distribution
    songs.forEach(song => {
      if (song.year) {
        stats.yearDistribution[song.year] = (stats.yearDistribution[song.year] || 0) + 1;
      }
    });
    
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
