// API utility functions for MirageJS mock backend

const API_BASE_URL = '/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data;
};

// Songs API
export const songsAPI = {
  // Get all songs with optional filtering
  fetchSongs: async (params = {}) => {
    const searchParams = new URLSearchParams();
    
    if (params.genre) searchParams.append('genre', params.genre);
    if (params.search) searchParams.append('search', params.search);
    if (params.limit) searchParams.append('limit', params.limit);
    if (params.offset) searchParams.append('offset', params.offset);
    
    const queryString = searchParams.toString();
    const url = `${API_BASE_URL}/songs${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Get single song by ID
  fetchSong: async (id) => {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`);
    return handleResponse(response);
  },

  // Create new song
  createSong: async (songData) => {
    const response = await fetch(`${API_BASE_URL}/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(songData),
    });
    return handleResponse(response);
  },

  // Update existing song
  updateSong: async (id, songData) => {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(songData),
    });
    return handleResponse(response);
  },

  // Delete song
  deleteSong: async (id) => {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Increment play count
  incrementPlayCount: async (id) => {
    const response = await fetch(`${API_BASE_URL}/songs/${id}/play`, {
      method: 'POST',
    });
    return handleResponse(response);
  },

  // Get available genres
  fetchGenres: async () => {
    const response = await fetch(`${API_BASE_URL}/songs/genres`);
    return handleResponse(response);
  },

  // Advanced search
  searchSongs: async (params = {}) => {
    const searchParams = new URLSearchParams();
    
    if (params.q) searchParams.append('q', params.q);
    if (params.genre) searchParams.append('genre', params.genre);
    if (params.artist) searchParams.append('artist', params.artist);
    if (params.year) searchParams.append('year', params.year);
    
    const queryString = searchParams.toString();
    const url = `${API_BASE_URL}/songs/search${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url);
    return handleResponse(response);
  }
};

// User API
export const userAPI = {
  // Get user profile
  fetchProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/user`);
    return handleResponse(response);
  }
};

// Stats API
export const statsAPI = {
  // Get application statistics
  fetchStats: async () => {
    const response = await fetch(`${API_BASE_URL}/stats`);
    return handleResponse(response);
  }
};

// Export all APIs
export default {
  songs: songsAPI,
  user: userAPI,
  stats: statsAPI
};
