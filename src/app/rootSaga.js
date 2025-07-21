import { all } from 'redux-saga/effects';
import { watchSongs } from '../features/songs/songsSaga';

export default function* rootSaga() {
  yield all([watchSongs()]);
}
