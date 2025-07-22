import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { songsAPI } from '../../api';
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure
} from './songsSlice';

// Saga Functions
function* fetchSongsSaga(action) {
  try {
    const response = yield call(songsAPI.fetchSongs, action.payload || {});
    
    yield put(fetchSongsSuccess(response.data.songs || []));
    toast.success(response.message || 'Songs loaded successfully! 🎵');
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
    toast.error('Failed to load songs. Please try again.');
  }
}

function* addSongSaga(action) {
  try {
    const response = yield call(songsAPI.createSong, action.payload);
    
    yield put(addSongSuccess(response.data));
    toast.success(response.message || `Song added successfully! ✨`);
  } catch (error) {
    yield put(addSongFailure(error.message));
    toast.error('Failed to add song. Please try again.');
  }
}

function* deleteSongSaga(action) {
  try {
    const response = yield call(songsAPI.deleteSong, action.payload);
    
    yield put(deleteSongSuccess(action.payload));
    toast.success(response.message || 'Song deleted successfully! 🗑️');
  } catch (error) {
    yield put(deleteSongFailure(error.message));
    toast.error('Failed to delete song. Please try again.');
  }
}

function* incrementPlayCountSaga(action) {
  try {
    const response = yield call(songsAPI.incrementPlayCount, action.payload);
    console.log('Play count updated:', response.data);
  } catch (error) {
    console.error('Failed to update play count:', error);
  }
}

export function* watchSongs() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
  yield takeLatest(addSongStart.type, addSongSaga);
  yield takeLatest(deleteSongStart.type, deleteSongSaga);
  // Add watcher for play count if you have that action
  // yield takeLatest('songs/incrementPlayCount', incrementPlayCountSaga);
}
