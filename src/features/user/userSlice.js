import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  stats: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Fetch User Profile
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch Stats
    fetchStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.error = null;
    },
    fetchStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Error
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  clearError
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUserProfile = (state) => state.user.profile;
export const selectUserStats = (state) => state.user.stats;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
