import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure
} from './songsSlice';

// Simulate API call
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

// Worker Saga
function* fetchSongsSaga() {
  try {
    const data = yield call(mockFetchSongs);
    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Watcher Saga
export function* watchSongs() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
}
