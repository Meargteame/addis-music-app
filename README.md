# AddisMusic - Full Stack Music Management App

AddisMusic is a modern, full-stack song management application built for Addis Software's intern test project. This app provides a beautiful and responsive interface for managing your music collection with complete CRUD operations.

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete songs
- **Modern UI**: Beautiful streaming-platform-inspired design
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Search & Filter**: Find songs by title, artist, album, or genre
- **Pagination**: Efficient handling of large music collections
- **Dark/Light Theme**: Toggle between theme modes
- **Real-time Validation**: Form validation with helpful error messages

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **LowDB** for lightweight JSON database
- **CORS** for cross-origin requests
- **ES Modules** for modern JavaScript

### Frontend
- **React** with functional components and hooks
- **Redux Toolkit** + **Redux-Saga** for state management
- **Emotion** for CSS-in-JS styling
- **Framer Motion** for animations
- **Manual Webpack** configuration (no Create React App)

## 📁 Project Structure

```
addis-music-app/
├── song-api-backend/           # Express.js API server
│   ├── routes/songs.js         # Song CRUD routes
│   ├── data/songs.json         # LowDB database file
│   ├── index.js               # Express server setup
│   └── package.json           # Backend dependencies
└── README.md                  # Project documentation
```

## 🎯 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd song-api-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The API server will run on `http://localhost:5000`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/songs` | Get all songs (with pagination, search, filters) |
| GET | `/api/songs/:id` | Get a specific song |
| POST | `/api/songs` | Create a new song |
| PUT | `/api/songs/:id` | Update an existing song |
| DELETE | `/api/songs/:id` | Delete a song |
| GET | `/api/songs/stats/summary` | Get collection statistics |
| GET | `/api/health` | Health check endpoint |

### Query Parameters (GET /api/songs)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `search`: Search term for title, artist, album, genre
- `genre`: Filter by genre
- `year`: Filter by year
- `sortBy`: Sort field (title, artist, album, year, duration)
- `sortOrder`: Sort order (asc, desc)

## 🔧 Environment Variables

Create a `.env` file in the `song-api-backend` directory:

```env
PORT=5000
NODE_ENV=development
API_BASE_URL=http://localhost:5000/api
```

## 📊 Sample Data

The app comes with sample Ethiopian music data including:
- Traditional Ethio-jazz tracks
- Classical compositions
- Ethiopian soul music

## 🎨 Design Features

- **Streaming Platform UI**: Modern, card-based layout
- **Grid/List Views**: Toggle between different viewing modes
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Design**: Mobile-first approach
- **Theme Support**: Dark and light mode switching
- **Loading States**: Beautiful loading indicators
- **Error Handling**: User-friendly error messages

## 🧪 Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Get all songs
curl http://localhost:5000/api/songs

# Search for songs
curl "http://localhost:5000/api/songs?search=tezeta"

# Create a new song
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d '{"title":"New Song","artist":"Artist Name"}'
```

## 📝 Git Workflow

This project follows a structured git workflow with meaningful commits:

- ✅ **Step 1**: Backend setup with Express and LowDB
- 🔄 **Step 2**: CRUD operations implementation
- 🎨 **Step 3**: Frontend React setup with Webpack
- 🎯 **Step 4**: Redux Toolkit and Redux-Saga integration
- 🌟 **Step 5**: UI components and styling
- 🚀 **Step 6**: Feature implementation and testing

## 🤝 Contributing

This project was built as part of Addis Software's intern selection process. It demonstrates:

- Full-stack development skills
- Modern JavaScript/React patterns
- API design and implementation
- State management with Redux
- Responsive UI/UX design
- Git version control best practices

## 📄 License

This project is created for educational and assessment purposes.

---

**Built with ❤️ for Addis Software**
