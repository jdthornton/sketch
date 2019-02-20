import Socket from '../utils/Socket';

export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST';
export const JOIN_ROOM_REQUEST__SUCCESS = 'JOIN_ROOM_REQUEST__SUCCESS';
export const JOIN_ROOM_REQUEST__FAILURE = 'JOIN_ROOM_REQUEST__FAILURE';
export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const CREATE_ROOM_REQUEST__SUCCESS = 'CREATE_ROOM_REQUEST__SUCCESS';
export const CREATE_ROOM_REQUEST__FAILURE = 'CREATE_ROOM_REQUEST__FAILURE';
export const ROOM_HOST_LEFT = 'ROOM_HOST_LEFT';
export const END_ROOM = 'END_ROOM';
export const START_ROOM = 'START_ROOM';
export const SET_ROOM_HOST = 'SET_ROOM_HOST';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';

export const openRoomForm = () => ({type: CREATE_ROOM})

export const handleCreateRoomSubmit = payload => ({type: CREATE_ROOM_REQUEST, payload})

export const joinRoom = payload => ({type: JOIN_ROOM_REQUEST, payload})

export const leaveRoom = () => ({type: LEAVE_ROOM})

export const startGame = () => {
  Socket.send(START_ROOM)
}

const initialState = {isLoading: true, host: null, winner: null, name: null};

const gameReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case END_ROOM:
            return {
              ...previousState,
              winner: payload.name
            }
        case START_ROOM:
            return {
              ...previousState,
              winner: null
            }
        case JOIN_ROOM_REQUEST__SUCCESS:
            return {
              ...previousState,
              host: payload.host,
              isLoading: false
            }
        case SET_ROOM_HOST:
            return {
              ...previousState,
              isHost: payload
            }
        default:
            return previousState;
    }
};

export default gameReducer;
