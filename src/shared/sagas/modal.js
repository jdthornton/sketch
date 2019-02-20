import { call, put, take, race } from "redux-saga/effects";
import { socketRequest } from './socket';

import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../utils/Modal';

/*
 *  Expects a socket request action, once the action is received it will send a socket request and return both the request action and response object
 */
function* modalWatcher(actionType){
  let action = yield take(actionType);
  let response = yield call(socketRequest, action)
  return { response, action }
}


/*
 *  Modal forms only - see modalWatcher.
 *  Sagas not needed for static modals use plain redux actions from modal utility instead
 *
 *  @param {string} modal - Name of the modal to be opened
 *  @param {string} actionType - The request action to be listened for
 *  @param {func} successHandler - A callback function
 */
export function* modalSaga(modal, actionType, successHandler){
  yield put({type: OPEN_MODAL, payload: modal});

  //End saga if user closes modal
  let { modalTask, cancel } = yield race({
    modalTask: call(modalWatcher, actionType),
    cancel: take(CLOSE_MODAL)
  })

  //If modal wasn't closed and the modal task was successful
  if(!cancel && modalTask.response && !modalTask.response.error){

    yield put({type: CLOSE_MODAL}) //close modal
    yield call(successHandler, modalTask.response.success, modalTask.action.payload) //run successhandler
  }
}
