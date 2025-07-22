import { createServer, Model, Factory, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      song: Model,
      user: Model,
    },

    factories: {
      song: Factory.extend({
        title(i) {
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
          return titles[i] || `Song ${i + 1}`;
        },
        
        artist(i) {
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
          return artists[i] || `Artist ${i + 1}`;
        },

        album(i) {
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
          return albums[i] || `Album ${i + 1}`;
        },

        genre() {
          const genres = ['pop', 'rock', 'hiphop', 'jazz', 'electronic', 'classical'];
          return genres[Math.floor(Math.random() * genres.length)];
        },

        duration() {
          const minutes = Math.floor(Math.random() * 4) + 2; // 2-5 minutes
          const seconds = Math.floor(Math.random() * 60);
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        },

        year() {
          return Math.floor(Math.random() * 30) + 1995; // 1995-2024
        },

        cover_image() {
          return `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`;
        },

        audio_file() {
          return null; // Mock audio files not needed for frontend
        },

        lyrics() {
          return 'Mock lyrics content for this beautiful Ethiopian song...';
        },

        play_count() {
          return Math.floor(Math.random() * 10000);
        },

        date_added() {
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 365));
          return date.toISOString();
        }
      }),

      user: Factory.extend({
        id: 1,
        name: 'Music Lover',
        email: 'user@addismusic.com',
        role: 'Music Enthusiast',
        location: 'Addis Ababa, Ethiopia',
        bio: 'Passionate about Ethiopian music and discovering new artists',
        avatar: 'https://picsum.photos/150/150?random=user',
        join_date() {
          return new Date('2023-01-15').toISOString();
        },
        favorite_genres: ['jazz', 'pop', 'traditional'],
        stats: {
          total_songs_added: 15,
          total_favorites: 8,
          total_plays: 1250,
          member_since: '2023-01-15'
        }
      })
    },

    seeds(server) {
      // Create initial songs
      server.createList('song', 12);
      
      // Create user
      server.create('user');
    },

    routes() {
      this.namespace = 'api';
      this.timing = 400; // Simulate network delay

      // Helper function for standardized responses
      const successResponse = (data, message = 'Success') => {
        return {
          success: true,
          data: data,
          message: message
        };
      };

      const errorResponse = (error, code = 400) => {
        return new Response(code, {}, {
          success: false,
          error: error,
          code: code
        });
      };

      // GET /api/songs - List songs with filtering and pagination
      this.get('/songs', (schema, request) => {
        let songs = schema.songs.all().models;
        const { genre, search, limit = '20', offset = '0' } = request.queryParams;

        // Filter by genre
        if (genre) {
          songs = songs.filter(song => 
            song.genre.toLowerCase() === genre.toLowerCase()
          );
        }

        // Search in title, artist, album
        if (search) {
          const searchTerm = search.toLowerCase();
          songs = songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm) ||
            (song.album && song.album.toLowerCase().includes(searchTerm))
          );
        }

        // Sort by date_added (newest first)
        songs.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

        // Pagination
        const startIndex = parseInt(offset);
        const endIndex = startIndex + parseInt(limit);
        const paginatedSongs = songs.slice(startIndex, endIndex);

        return successResponse({
          songs: paginatedSongs,
          pagination: {
            total: songs.length,
            limit: parseInt(limit),
            offset: parseInt(offset),
            has_more: endIndex < songs.length
          }
        }, `Retrieved ${paginatedSongs.length} songs`);
      });

      // GET /api/songs/:id - Get single song
      this.get('/songs/:id', (schema, request) => {
        const song = schema.songs.find(request.params.id);
        
        if (!song) {
          return errorResponse('Song not found', 404);
        }

        return successResponse(song.attrs, `Retrieved song: ${song.title}`);
      });

      // POST /api/songs - Create new song
      this.post('/songs', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        
        // Validate required fields
        if (!attrs.title || !attrs.artist) {
          return errorResponse('Title and artist are required', 400);
        }

        // Add default values
        const songData = {
          ...attrs,
          id: Date.now().toString(), // Simple ID generation
          play_count: 0,
          date_added: new Date().toISOString(),
          cover_image: attrs.cover_image || `https://picsum.photos/300/300?random=${Date.now()}`,
        };

        const newSong = schema.songs.create(songData);
        
        return successResponse(
          newSong.attrs, 
          `Song "${newSong.title}" by ${newSong.artist} created successfully`
        );
      });

      // PUT /api/songs/:id - Update song
      this.put('/songs/:id', (schema, request) => {
        const song = schema.songs.find(request.params.id);
        
        if (!song) {
          return errorResponse('Song not found', 404);
        }

        const attrs = JSON.parse(request.requestBody);
        song.update(attrs);

        return successResponse(
          song.attrs, 
          `Song "${song.title}" updated successfully`
        );
      });

      // DELETE /api/songs/:id - Delete song
      this.delete('/songs/:id', (schema, request) => {
        const song = schema.songs.find(request.params.id);
        
        if (!song) {
          return errorResponse('Song not found', 404);
        }

        const songTitle = song.title;
        const songArtist = song.artist;
        song.destroy();

        return successResponse(
          { deleted_song_id: request.params.id },
          `Song "${songTitle}" by ${songArtist} deleted successfully`
        );
      });

      // GET /api/user - Get user profile
      this.get('/user', (schema) => {
        const user = schema.users.first();
        
        if (!user) {
          return errorResponse('User not found', 404);
        }

        return successResponse(user.attrs, 'User profile retrieved successfully');
      });

      // GET /api/stats - Get application statistics
      this.get('/stats', (schema) => {
        const songs = schema.songs.all().models;
        const user = schema.users.first();

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

        return successResponse(stats, 'Statistics retrieved successfully');
      });

      // POST /api/songs/:id/play - Increment play count
      this.post('/songs/:id/play', (schema, request) => {
        const song = schema.songs.find(request.params.id);
        
        if (!song) {
          return errorResponse('Song not found', 404);
        }

        const newPlayCount = (song.play_count || 0) + 1;
        song.update({ play_count: newPlayCount });

        return successResponse(
          { 
            song_id: song.id,
            play_count: newPlayCount 
          },
          `Play count updated for "${song.title}"`
        );
      });

      // GET /api/songs/genres - Get available genres
      this.get('/songs/genres', () => {
        const availableGenres = [
          'pop', 'rock', 'hiphop', 'jazz', 'electronic', 'classical'
        ];

        return successResponse(
          availableGenres,
          'Available genres retrieved successfully'
        );
      });

      // GET /api/songs/search - Advanced search (alternative endpoint)
      this.get('/songs/search', (schema, request) => {
        let songs = schema.songs.all().models;
        const { q, genre, artist, year } = request.queryParams;

        if (q) {
          const searchTerm = q.toLowerCase();
          songs = songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm) ||
            (song.album && song.album.toLowerCase().includes(searchTerm)) ||
            (song.lyrics && song.lyrics.toLowerCase().includes(searchTerm))
          );
        }

        if (genre) {
          songs = songs.filter(song => song.genre.toLowerCase() === genre.toLowerCase());
        }

        if (artist) {
          songs = songs.filter(song => 
            song.artist.toLowerCase().includes(artist.toLowerCase())
          );
        }

        if (year) {
          songs = songs.filter(song => song.year === parseInt(year));
        }

        return successResponse(
          songs,
          `Found ${songs.length} songs matching search criteria`
        );
      });

      // Fallback for unmatched routes
      this.passthrough();
    },
  });

  return server;
}
