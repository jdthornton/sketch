import { all, call, put, take, takeEvery, select, race, fork } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import { push } from 'connected-react-router';

import Socket from '../utils/Socket';
import { socketRequest } from './socket';
import { getUserFromState, authFlow } from './auth';
import { modalSaga } from './modal'

import {
  SUBMIT_MESSAGE,
  ADD_MESSAGE
} from '../reducers/chat';
import {
  JOIN_ROOM_REQUEST,
  CREATE_ROOM,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_REQUEST__FAILURE,
  LEAVE_ROOM
} from '../reducers/room';
import {
  addToast
} from '../reducers/toast'


function* chatWatcher(name) {
  while (true) {
    const action = yield take(SUBMIT_MESSAGE);
    yield put({type: ADD_MESSAGE, payload: {name: name, text: action.payload}})
    Socket.send(SUBMIT_MESSAGE, action.payload);
  }
}

function* roomConnectionSaga(action, name){
  let { success, error } = yield call(socketRequest, action);
  if(success){
    yield put(addToast("success", "You have successfully joined "+action.payload))
    yield fork(chatWatcher, name);
  } else {
    yield put(push('/'));
  }
}

function* joinFlow(action){
  let user = yield select(getUserFromState)

  if(user){
    // Run game saga until a LEAVE_ROOM action is recieved
    let { disconnect } = yield race({
      connect: call(roomConnectionSaga, action, user.name),
      disconnect: take(LEAVE_ROOM)
    })

    // Then send the LEAVE_ROOM action to server
    Socket.send(LEAVE_ROOM)
  }

  else {
    // Go to lobby
    yield put(push('/'))
    yield call(authFlow, function*(){
      // once authorized push back to room (to start saga over again)
      yield put(push('/'+action.payload))
    })
  }
}

export function* createFlow(){
  let user = yield select(getUserFromState)
  if(user){
    yield call(modalSaga, "create", CREATE_ROOM_REQUEST, function*(res, req){
      yield put(push("/"+req));
    }, function*(error){
      yield put({type: CREATE_ROOM_REQUEST__FAILURE, payload: error})
    })
  } else {
    yield call(authFlow, createFlow)
  }
}

export default function* roomSagas() {
  yield takeEvery(JOIN_ROOM_REQUEST, joinFlow)
  yield takeEvery(CREATE_ROOM, createFlow)
}
