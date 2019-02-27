const ADD_TOAST = 'ADD_TOAST';
const REMOVE_TOAST = 'REMOVE_TOAST';

let count = 0;
export const addToast = (status, text) => ({type: ADD_TOAST, payload: {id: count++, status, text}})
export const removeToast = id => ({type: REMOVE_TOAST, payload: id})

export default function reducer(previousState = [], {type, payload}){
  switch (type) {
    case ADD_TOAST:
      return [...previousState, payload]
    case REMOVE_TOAST:
      return previousState.filter(toast => toast.id !== payload)
    default:
      return previousState
  }
}
