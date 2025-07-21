import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSong: (state, action) => {
      state.list.unshift(action.payload);
    },
    deleteSong: (state, action) => {
      state.list = state.list.filter(song => song.id !== action.payload);
    }
  }
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  deleteSong
} = songsSlice.actions;

export default songsSlice.reducer;
