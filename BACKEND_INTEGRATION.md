# 🔌 React Redux Integration with Flask Backend

## API Integration Guide for Your React App

### 1. Update API Base URL

Update your Redux-Saga API calls to use the Flask backend:

```javascript
// src/api/config.js
export const API_BASE_URL = 'http://localhost:5000/api/v1';

// API endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  
  // Songs
  SONGS: {
    LIST: '/songs',
    CREATE: '/songs',
    DETAIL: (id) => `/songs/${id}`,
    UPDATE: (id) => `/songs/${id}`,
    DELETE: (id) => `/songs/${id}`,
    FAVORITE: (id) => `/songs/${id}/favorite`,
    PLAY: (id) => `/songs/${id}/play`,
    FAVORITES: '/songs/favorites'
  },
  
  // Users
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    DETAIL: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    STATS: (id) => `/users/${id}/stats`,
    SONGS: (id) => `/users/${id}/songs`,
    FAVORITES: (id) => `/users/${id}/favorites`,
    PROFILE: (id) => `/users/${id}/profile`,
    SEARCH: '/users/search'
  }
};
```

### 2. Update Redux Actions

```javascript
// src/features/songs/songsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, ENDPOINTS } from '../../api/config';

// Async thunks for API calls
export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async ({ page = 1, per_page = 20, genre, search } = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('per_page', per_page);
    if (genre) params.append('genre', genre);
    if (search) params.append('search', search);
    
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SONGS.LIST}?${params}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data;
  }
);

export const createSong = createAsyncThunk(
  'songs/createSong',
  async (songData, { getState }) => {
    const { auth } = getState();
    
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SONGS.CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(songData)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data;
  }
);

export const addToFavorites = createAsyncThunk(
  'songs/addToFavorites',
  async ({ songId, userId }, { getState }) => {
    const { auth } = getState();
    
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SONGS.FAVORITE(songId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({ user_id: userId })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data;
  }
);

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      per_page: 20,
      total: 0,
      pages: 0
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createSong.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        // Update local state as needed
      });
  }
});

export default songsSlice.reducer;
```

### 3. Authentication Integration

```javascript
// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, ENDPOINTS } from '../../api/config';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    // Store token in localStorage
    localStorage.setItem('token', data.data.token);
    
    return data.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    // Store token in localStorage
    localStorage.setItem('token', data.data.token);
    
    return data.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

### 4. Update Your Add Song Form

```javascript
// Update AddSongForm.jsx to work with new API
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSong } from '../features/songs/songsSlice';

const AddSongForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.songs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const songData = {
      title: formData.get('title'),
      artist: formData.get('artist'),
      album: formData.get('album'),
      genre: formData.get('genre'),
      duration: parseInt(formData.get('duration')),
      year: parseInt(formData.get('year')),
      lyrics: formData.get('lyrics'),
      user_id: user.id
    };

    try {
      await dispatch(createSong(songData)).unwrap();
      onClose();
      // Show success message
    } catch (error) {
      // Show error message
      console.error('Failed to create song:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your existing form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Add Song'}
      </button>
    </form>
  );
};
```

### 5. Environment Variables

Create a `.env` file in your React app root:

```env
# React Frontend Environment
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
REACT_APP_API_TIMEOUT=5000
```

### 6. API Response Format

Your Flask backend returns responses in this format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "pages": 5
  }
}
```

Make sure to handle this in your Redux reducers by accessing `action.payload.data` for the actual data.

### 7. Start Both Servers

1. **Flask Backend:**
   ```bash
   cd flask-backend
   python run.py
   # Runs on http://localhost:5000
   ```

2. **React Frontend:**
   ```bash
   npm start
   # Runs on http://localhost:3000
   ```

### 8. Test the Integration

1. Register a new user through your React app
2. Login and create songs
3. Test favorites functionality
4. Check user profile features

The Flask backend provides comprehensive CRUD operations for songs, users, and authentication that will seamlessly integrate with your existing React components! 🎉
