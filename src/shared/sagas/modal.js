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
 *  Flow for modal forms
 *
 *  @param {string} modal - Name of the modal to be opened
 *  @param {string} actionType - The action type associated with the modal - saga begins socket request when this action is received
 *  @param {func} successHandler - A success callback
 *  @param {func} errorHandler - An error callback
 */
export function* modalSaga(modal, actionType, successHandler, errorHandler){
  yield put({type: OPEN_MODAL, payload: modal});
  while(true){

    let { modalTask, cancel } = yield race({
      modalTask: call(modalWatcher, actionType),
      cancel: take(CLOSE_MODAL)
    })
    if(cancel) return;
    else if(modalTask.response.error){
      yield call(errorHandler, modalTask.response.error)
    } else {
      yield put({type: CLOSE_MODAL})
      yield call(successHandler, modalTask.response.success, modalTask.action.payload)
      return;
    }
  }

}
