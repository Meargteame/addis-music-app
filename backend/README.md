# AddisMusic Backend API

A fully functional Express.js backend that replaces MirageJS mock server with real API endpoints. This backend provides all the same functionality as the frontend expects, with in-memory data storage.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or run directly
node index.js
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Songs API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/api/songs` | List all songs with filtering and pagination | `genre`, `search`, `limit`, `offset` |
| `GET` | `/api/songs/:id` | Get single song details | - |
| `POST` | `/api/songs` | Create new song | Song data in body |
| `PUT` | `/api/songs/:id` | Update existing song | Song data in body |
| `DELETE` | `/api/songs/:id` | Delete song | - |
| `POST` | `/api/songs/:id/play` | Increment play count | - |

### Additional Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user` | Get user profile |
| `GET` | `/api/stats` | Get application statistics |
| `GET` | `/api/songs/genres` | Get available genres |
| `GET` | `/api/songs/search` | Advanced search |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/reset` | Reset all data to initial state |
| `GET` | `/api/admin/storage-info` | Get memory usage info |

## 📄 Response Format

All endpoints return standardized JSON responses:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "code": 400
}
```

## 🎵 Sample Song Data Structure

```json
{
  "id": 1,
  "title": "Tizita",
  "artist": "Mahmoud Ahmed",
  "album": "Soul of Addis",
  "genre": "jazz",
  "duration": "3:45",
  "year": 2010,
  "cover_image": "https://picsum.photos/300/300?random=123",
  "audio_file": null,
  "lyrics": "Mock lyrics content...",
  "play_count": 1250,
  "date_added": "2024-01-15T10:30:00.000Z"
}
```

## 👤 User Profile Structure

```json
{
  "id": 1,
  "name": "Music Lover",
  "email": "user@addismusic.com",
  "role": "Music Enthusiast",
  "location": "Addis Ababa, Ethiopia",
  "bio": "Passionate about Ethiopian music and discovering new artists",
  "avatar": "https://picsum.photos/150/150?random=user",
  "join_date": "2023-01-15T00:00:00.000Z",
  "favorite_genres": ["jazz", "pop", "traditional"],
  "stats": {
    "total_songs_added": 15,
    "total_favorites": 8,
    "total_plays": 1250,
    "member_since": "2023-01-15"
  }
}
```

## 📊 Statistics Response

```json
{
  "total_songs": 12,
  "total_artists": 10,
  "popular_genres": {
    "jazz": 3,
    "pop": 2,
    "rock": 2,
    "hiphop": 2,
    "electronic": 2,
    "classical": 1
  },
  "total_plays": 45678,
  "newest_song": "Digital Ethiopia",
  "user_stats": {
    "total_songs_added": 15,
    "total_favorites": 8,
    "total_plays": 1250,
    "member_since": "2023-01-15"
  }
}
```

## 🔧 Features

- ✅ **CORS Enabled** - Ready for frontend integration
- ✅ **JSON Parsing** - Handles JSON request bodies
- ✅ **In-Memory Storage** - No database required for development
- ✅ **Mock Data Generation** - Automatic Ethiopian music-themed data
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **Filtering & Search** - Support for genre filtering and text search
- ✅ **Pagination** - Efficient data loading with limit/offset
- ✅ **Statistics** - Real-time stats calculation
- ✅ **Play Count Tracking** - Track song popularity
- ✅ **Admin Routes** - Data management and debugging

## 🏗️ Architecture

- **Express.js 4.x** - Web framework
- **CORS** - Cross-origin resource sharing
- **In-Memory Arrays** - Simple data storage
- **RESTful Design** - Standard HTTP methods and status codes
- **Modular Structure** - Ready for database integration

## 🔄 Replacing MirageJS

This backend is a drop-in replacement for MirageJS. To use it:

1. Start this backend server on port 5000
2. Update the frontend API base URL to point to `http://localhost:5000/api`
3. Disable MirageJS in the frontend
4. All existing frontend code will work without changes!

## 🛠️ Development

### Adding New Endpoints

1. Add route handler to `index.js`
2. Follow the response format conventions
3. Update this README

### Database Integration

The code is structured to make database integration easy:

1. Replace in-memory arrays with database calls
2. Keep the same response format
3. Add database connection configuration
4. Implement data persistence

### Environment Variables

```bash
PORT=5000  # Server port (default: 5000)
```

## 🧪 Testing

Test endpoints using curl, Postman, or any HTTP client:

```bash
# Get all songs
curl http://localhost:5000/api/songs

# Get songs with genre filter
curl http://localhost:5000/api/songs?genre=jazz

# Search songs
curl http://localhost:5000/api/songs?search=tizita

# Get user profile
curl http://localhost:5000/api/user

# Get statistics
curl http://localhost:5000/api/stats

# Create new song
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d '{"title":"New Song","artist":"Test Artist","genre":"pop"}'
```

## 📦 Dependencies

- **express**: ^4.18.2 - Web framework
- **cors**: ^2.8.5 - CORS middleware
- **body-parser**: ^1.20.2 - JSON parsing (built into Express 4.16+)

## 🎯 Next Steps

1. **Database Integration** - Add MongoDB or PostgreSQL
2. **Authentication** - Add JWT-based auth
3. **File Upload** - Handle audio file uploads
4. **Caching** - Add Redis for performance
5. **Testing** - Add unit and integration tests
6. **Documentation** - Add OpenAPI/Swagger docs
7. **Docker** - Containerize the application
