import { CREATE_ROOM_REQUEST } from './room';
import { OPEN_SOCKET } from './socket';

export const LOBBY_SUBSCRIPTION_REQUEST = "LOBBY_SUBSCRIPTION_REQUEST";
export const LOBBY_SUBSCRIPTION_REQUEST__SUCCESS = "LOBBY_SUBSCRIPTION_REQUEST__SUCCESS";
export const LOBBY_SUBSCRIPTION_REQUEST__FAILURE = "LOBBY_SUBSCRIPTION_REQUEST__FAILURE";
export const UNSUBSCRIBE_FROM_LOBBY = "UNSUBSCRIBE_FROM_LOBBY";
export const UPDATE_ROOM_ACTIONS = "UPDATE_ROOM_ACTIONS";
export const REMOVE_ROOM_FROM_LOBBY = "REMOVE_ROOM_FROM_LOBBY";
export const ADD_ROOM_TO_LOBBY = "ADD_ROOM_TO_LOBBY";

export const actions = {
  subscribe: () => ({type: LOBBY_SUBSCRIPTION_REQUEST }),
  unsubscribe: () => ({type: UNSUBSCRIBE_FROM_LOBBY})
}

export const handleCreateRoomSubmit = name => ({type: CREATE_ROOM_REQUEST, payload: name})

const initialState = {isLoading: false, roomNames: null, roomMap: null};

const lobbyReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_ROOM_ACTIONS:
          return {
            ...previousState,
            roomMap: {
              ...previousState.roomMap,
              [payload.name]: payload.actions
            }
          }
        case LOBBY_SUBSCRIPTION_REQUEST:
            return {
              isLoading: true
            }
        case LOBBY_SUBSCRIPTION_REQUEST__SUCCESS:
            return {
              roomNames: Object.keys(payload),
              roomMap: payload,
              isLoading: false
            }
        case LOBBY_SUBSCRIPTION_REQUEST__FAILURE:
            return {
              ...previousState,
              isLoading: true
            }
        case REMOVE_ROOM_FROM_LOBBY:
          const { [payload]: deletedValue, ...newActionMap } = previousState.roomMap;
          return {
             ...previousState,
             roomNames: previousState.roomNames.filter(room => room !== payload),
             roomMap: newActionMap
          };
        case ADD_ROOM_TO_LOBBY:
          return {
            ...previousState,
            roomNames: [ ...previousState.roomNames, payload.name],
            roomMap: {
              ...previousState.roomMap,
              [payload]: []
            }
          }
        case CREATE_ROOM_REQUEST:
            return {
              ...previousState,
              isLoading: true
            }
        case OPEN_SOCKET:
            return initialState;
        default:
            return previousState;
    }
};

export default lobbyReducer;
