import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
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

// 🧪 Mock fetch
function mockFetchSongs() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Afro Vibe', artist: 'Yared Beats', album: 'Ethiowave', year: 2023 },
        { id: 2, title: 'Roha Funk', artist: 'Roha Band', album: 'Roha Classics', year: 1998 }
      ]);
    }, 1000)
  );
}

function* fetchSongsSaga() {
  try {
    const data = yield call(mockFetchSongs);
    yield put(fetchSongsSuccess(data));
    toast.success('Songs loaded successfully! 🎵');
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
    toast.error('Failed to load songs. Please try again.');
  }
}

// 🆕 Add Song Saga
function* addSongSaga(action) {
  try {
    yield delay(500); // simulate delay
    const newSong = { ...action.payload, id: Date.now().toString() };
    yield put(addSongSuccess(newSong));
    toast.success(`"${newSong.title}" added successfully! ✨`);
  } catch (error) {
    yield put(addSongFailure(error.message));
    toast.error('Failed to add song. Please try again.');
  }
}

// 🆕 Delete Song Saga
function* deleteSongSaga(action) {
  try {
    yield delay(300); // simulate delay
    yield put(deleteSongSuccess(action.payload)); // just pass ID
    toast.success('Song deleted successfully! 🗑️');
  } catch (error) {
    yield put(deleteSongFailure(error.message));
    toast.error('Failed to delete song. Please try again.');
  }
}

export function* watchSongs() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
  yield takeLatest(addSongStart.type, addSongSaga);
  yield takeLatest(deleteSongStart.type, deleteSongSaga);
}
