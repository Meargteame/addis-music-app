import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { id: 1, title: 'Afro Vibe', artist: 'Yared Beats', album: 'Ethiowave', year: 2023 },
    { id: 2, title: 'Roha Funk', artist: 'Roha Band', album: 'Roha Classics', year: 1998 }
  ]
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.list.unshift(action.payload);
    },
    deleteSong: (state, action) => {
      state.list = state.list.filter(song => song.id !== action.payload);
    }
  }
});

export const { addSong, deleteSong } = songsSlice.actions;
export default songsSlice.reducer;
