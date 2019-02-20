import { all } from 'redux-saga/effects';

import lobbySagas from './lobby';
import roomSagas from './room';
import socketSagas from './socket';

export default function* rootSaga() {
  yield all([
    lobbySagas(),
    roomSagas(),
    socketSagas()
  ]);
}
