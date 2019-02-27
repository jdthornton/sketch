import { call, take, put, fork, race, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga';

import { authRequestSaga } from './auth';
import Socket from '../utils/Socket';


import {
  SET_COLOR,
  SET_TOOL,
  DRAW_ACTION,
} from '../utils/Canvas'
import {
  OPEN_SOCKET,
  OPEN_SOCKET__SUCCESS,
  CLOSE_SOCKET
} from '../reducers/socket';
import {
  addToast
} from '../reducers/toast'

/**
 *  This function handles the events received from the socket channel
 */

function* eventHandlerSaga(channel){
  while(true){
    const event = yield take(channel); //all events are actions
    if(event.type == OPEN_SOCKET__SUCCESS){
      yield fork(authRequestSaga);
    }

    yield put(event) //dispatch all messages
  }
}


/**
 *  A socket request abstraction that recognizes success and failure messages recieved from server
 */

export function* socketRequest({ type, payload }){
  Socket.send(type, payload);
  let { success, failure } = yield race({
    success: take(type+'__SUCCESS'),
    failure: take(type+'__FAILURE')
  })

  if(failure){
    yield put(addToast("error", failure.payload))
    return {error: failure.payload};
  } else {
    return {success: success.payload}
  }
}


/**
 *  Returns a saga event channel that handles main socket events
 */

const socketChannel = () => eventChannel(emit => {

  Socket.connection.onmessage = ({data}) => {
    let action = JSON.parse(data);
    emit(action)
  }
  Socket.connection.onopen = () => {
    emit(addToast("success", "Join a room to begin playing."))
    emit({type: OPEN_SOCKET__SUCCESS})
  }
  Socket.connection.onclose = () => {
    emit(addToast("error", "Connection error"))
    emit({type: CLOSE_SOCKET})
  }

  //called on channel close
  return () => {
    Socket.connection.close();
    Socket.connection = null;
  }
})



/**
 *  Main socket saga that initializes socket connection and
 *  begins cancellable saga event channel
 */

export function* socketFlow() {
  Socket.init(WS_URL);
  const channel = yield call(socketChannel);

  //Listen to the socket event channel until cancel action
  const { cancel } = yield race({
    listen: call(eventHandlerSaga, channel),
    cancel: take(CLOSE_SOCKET)
  });

  //Close channel on cancel
  if (cancel) {
    channel.close();
  }
}

export default function* socketSaga() {
  yield takeEvery(OPEN_SOCKET, socketFlow);
}
