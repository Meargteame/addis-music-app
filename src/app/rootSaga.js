import { all } from 'redux-saga/effects';
import { watchSongs } from '../features/songs/songsSaga';
import { watchUser } from '../features/user/userSaga';

export default function* rootSaga() {
  yield all([
    watchSongs(),
    watchUser()
  ]);
}
