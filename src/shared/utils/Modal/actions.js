import * as types from './types';

export const openModal = payload => ({
  type: types.OPEN_MODAL,
  payload: payload
})

export const closeModal = () => ({type: types.CLOSE_MODAL})
