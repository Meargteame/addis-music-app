# 🔧 Development Setup Guide - Backend Integration

This guide explains how to run AddisMusic with the new Express.js backend instead of MirageJS.

## 🚀 Quick Start (Both Frontend & Backend)

```bash
# Option 1: Run both servers with one command
npm run dev

# Option 2: Run servers separately
npm run start:backend    # Starts backend on port 5000
npm run start:frontend   # Starts frontend on port 3000
```

## 🔧 Individual Server Commands

### Backend Only
```bash
cd backend
npm install  # if not already installed
npm start    # Starts Express.js server on port 5000
```

### Frontend Only
```bash
npm start    # Starts React app on port 3000 (using real backend)
```

### Frontend with Mock Data (MirageJS)
```bash
npm run start:mock    # Uses MirageJS instead of real backend
```

## 🌐 Server URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Integration Test**: Open `test-integration.html` in browser

## 🔄 Switching Between Mock and Real Backend

### Use Real Express.js Backend (Default)
```bash
# Set in .env file
REACT_APP_USE_MOCK_SERVER=false
```

### Use MirageJS Mock Server
```bash
# Set in .env file
REACT_APP_USE_MOCK_SERVER=true

# Or use the mock script
npm run start:mock
```

## 📡 API Integration Status

✅ **Completed Integration**:
- API base URL updated to `http://localhost:5000/api`
- MirageJS disabled by default
- CORS enabled on backend
- Environment configuration added
- All endpoints match frontend expectations

✅ **Available Endpoints**:
- `GET /api/songs` - List songs with filtering
- `GET /api/songs/:id` - Get single song
- `POST /api/songs` - Create new song
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song
- `POST /api/songs/:id/play` - Increment play count
- `GET /api/user` - Get user profile
- `GET /api/stats` - Get statistics

## 🧪 Testing the Integration

### 1. Manual API Testing
```bash
# Test songs endpoint
curl http://localhost:5000/api/songs

# Test user endpoint
curl http://localhost:5000/api/user

# Test stats endpoint
curl http://localhost:5000/api/stats
```

### 2. Integration Test Page
Open `test-integration.html` in your browser to test all endpoints with a visual interface.

### 3. Frontend Testing
1. Start both backend and frontend
2. Open http://localhost:3000
3. Verify that songs load from the Express backend
4. Test CRUD operations (add, edit, delete songs)
5. Check statistics and user profile

## 🔧 Configuration Files

### Environment Variables (.env)
```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_USE_MOCK_SERVER=false
REACT_APP_ENVIRONMENT=development
```

### Package.json Scripts
```json
{
  "start": "webpack serve --mode development --open",
  "start:backend": "cd backend && npm start",
  "start:frontend": "webpack serve --mode development --open", 
  "dev": "concurrently \"npm run start:backend\" \"npm run start:frontend\"",
  "start:mock": "set REACT_APP_USE_MOCK_SERVER=true && webpack serve --mode development --open"
}
```

## 🐛 Troubleshooting

### Backend Not Starting
```bash
cd backend
npm install
node index.js
```

### CORS Issues
- Backend has CORS enabled for all origins
- Check that backend is running on port 5000

### Frontend Can't Connect to Backend
1. Verify backend is running: `curl http://localhost:5000/api/songs`
2. Check .env file has correct `REACT_APP_API_BASE_URL`
3. Clear browser cache and restart frontend

### Port Conflicts
- Backend: Change `PORT` in backend/index.js
- Frontend: Change `port` in webpack.config.js

## 📁 Project Structure
```
addis-music-app/
├── backend/                 # Express.js backend
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── src/                    # React frontend
│   ├── api/index.js        # API client (updated for backend)
│   ├── index.js            # App entry (MirageJS disabled)
│   └── ...
├── .env                    # Environment configuration
├── test-integration.html   # Manual testing page
└── package.json           # Frontend dependencies
```

## 🎯 Next Steps

1. **Database Integration**: Replace in-memory storage with MongoDB/PostgreSQL
2. **Authentication**: Add JWT-based user authentication
3. **File Upload**: Handle audio file uploads for songs
4. **Real-time Features**: Add WebSocket for live updates
5. **Deployment**: Deploy backend to cloud service
6. **Testing**: Add automated integration tests

## 📚 Additional Resources

- [Backend API Documentation](backend/README.md)
- [Frontend Documentation](README.md)
- [MirageJS Documentation](https://miragejs.com/) (for mock mode)
