import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { userAPI, statsAPI } from '../../api';
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure
} from './userSlice';

// Saga Functions
function* fetchProfileSaga() {
  try {
    const response = yield call(userAPI.fetchProfile);
    
    yield put(fetchProfileSuccess(response.data));
    console.log('User profile loaded successfully');
  } catch (error) {
    yield put(fetchProfileFailure(error.message));
    toast.error('Failed to load user profile');
  }
}

function* fetchStatsSaga() {
  try {
    const response = yield call(statsAPI.fetchStats);
    
    yield put(fetchStatsSuccess(response.data));
    console.log('Stats loaded successfully');
  } catch (error) {
    yield put(fetchStatsFailure(error.message));
    toast.error('Failed to load statistics');
  }
}

export function* watchUser() {
  yield takeLatest(fetchProfileStart.type, fetchProfileSaga);
  yield takeLatest(fetchStatsStart.type, fetchStatsSaga);
}
