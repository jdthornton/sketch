import { take, call, put, race, select, takeEvery } from 'redux-saga/effects';
import decode from 'jwt-decode';

import Socket from '../utils/Socket';

import {
  TOKEN_REQUEST,
  TOKEN_REQUEST__SUCCESS,
  AUTHORIZATION_REQUEST,
  LOAD_AUTH_DATA
} from '../reducers/auth';
import {
  addToast
} from '../reducers/toast'

import {
  socketRequest
} from './socket';
import {
  modalSaga
} from './modal';

export function getUserFromState({auth}){return auth.user};

/*
 *  Decodes token and adds user to state
 */
export function* getUserFromToken(token){
  let user = yield call(decode, token);
  yield put({type: LOAD_AUTH_DATA, payload: user})
}


/*
 *  If a token is found in storage this function will make a request to server to authenticate the socket connection
 *  (Used when socket first connects)
 */
export function* authRequestSaga(){
  let token = localStorage.token;
  if(token && token !== 'undefined'){
    // auth request
    let isAuthenticated = yield call(socketRequest, AUTHORIZATION_REQUEST, token)

    // load user on success
    if(isAuthenticated){
      yield call(getUserFromToken, token);
    }
  }
}

/*
 *  Requests an auth token from the server and stores token on success
 */
function* tokenRequestSaga(){
  let action = yield take(TOKEN_REQUEST)
  Socket.send(action.type, action.payload)
  let { payload } = yield take(TOKEN_REQUEST__SUCCESS);
  localStorage.token = payload;
  yield call(getUserFromToken, payload)
  return true
}

/*
 *  Begins the auth flow and runs the passed success handler on auth success
 */
export function* authFlow(successHandler){
  yield put(addToast({status: "error", text: "You must choose a display name first"}))
  yield call(modalSaga, "auth", TOKEN_REQUEST, function*(token){
    if(token){
      localStorage.token = token;
      yield call(getUserFromToken, token)
      if(successHandler) yield call(successHandler)
    }
  })
}
