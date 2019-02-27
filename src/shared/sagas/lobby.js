import { take, race, takeEvery, takeLatest, call } from 'redux-saga/effects';

import Socket from '../utils/Socket';

import {
  UNSUBSCRIBE_FROM_LOBBY,
  LOBBY_SUBSCRIPTION_REQUEST
} from '../reducers/lobby';
import { socketRequest } from './socket';
import { createFlow } from './room';


/*
 * Manages your lobby subscription and starts the room creation saga
 */

function* lobbySubscriptionSaga(action){
  let success = yield call(socketRequest, action)
  if(success){
    yield take(UNSUBSCRIBE_FROM_LOBBY)
    Socket.send(UNSUBSCRIBE_FROM_LOBBY)
  }
}

export default function* lobbySagas() {
  yield takeEvery(LOBBY_SUBSCRIPTION_REQUEST, lobbySubscriptionSaga);
}
