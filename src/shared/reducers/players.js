import { JOIN_ROOM_REQUEST__SUCCESS, START_ROOM } from './room';

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_SCORES = 'UPDATE_SCORES';

const initialState = null;

const playersReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_SCORES:
          return {
            ...previousState,
            [payload.guesser.id]: {...previousState[payload.guesser.id], score: previousState[payload.guesser.id].score + payload.guesser.points},
            [payload.drawer]: {...previousState[payload.drawer], score: previousState[payload.drawer].score + 1}
          }
        case JOIN_ROOM_REQUEST__SUCCESS:
          return payload.players
        case ADD_PLAYER:
          return {
            ...previousState,
            [payload.id]: {...payload, score: 0}
          }
        case REMOVE_PLAYER:
            const { [payload.id]: deletedValue, ...newPlayerMap } = previousState;
            return newPlayerMap;
        case START_ROOM:
          const updatedPlayers = Object.keys(previousState).reduce((obj, id) => {
            return {...obj, [id]: {...previousState[id], score: 0}}
          }, {})
          return updatedPlayers
        default:
            return previousState;
    }
};

export default playersReducer;
