import { take, race, takeEvery, takeLatest, call } from 'redux-saga/effects';

import Socket from '../utils/Socket';

import {
  UNSUBSCRIBE_FROM_LOBBY,
  LOBBY_SUBSCRIPTION_REQUEST
} from '../reducers/lobby';
import {
  CREATE_ROOM
} from '../reducers/room';
import { socketRequest } from './socket';
import { createFlow } from './room';


/*
 * Manages your lobby subscription and starts the room creation saga
 */

function* lobbySubscriptionSaga(action){
  let success = yield call(socketRequest, action)
  if(success){
    let { leave } = yield race({
      watch: takeLatest(CREATE_ROOM, createFlow), //take every create action and start a saga
      leave: take(UNSUBSCRIBE_FROM_LOBBY)
    })
    if(leave){
      Socket.send(UNSUBSCRIBE_FROM_LOBBY);
    }
  }
}

export default function* lobbySagas() {
  yield takeEvery(LOBBY_SUBSCRIPTION_REQUEST, lobbySubscriptionSaga);
}
