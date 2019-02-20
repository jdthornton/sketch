import { START_NEXT_ROUND } from './round';
import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_SCORES } from './players';
import { END_ROOM, LEAVE_ROOM } from './room';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SUBMIT_MESSAGE = 'SUBMIT_MESSAGE'

export const handleSubmit = payload => ({ type: SUBMIT_MESSAGE, payload })

function gameMessage(message){
  return {
    name: null,
    text: message
  }
}

const initialState = [];

const chatReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case LEAVE_ROOM:
            return []
        case ADD_MESSAGE:
            return [...previousState, payload]
        case UPDATE_SCORES:
            return [...previousState, gameMessage(`${payload.guesser.name} has scored ${payload.guesser.points} points.`)]
        case START_NEXT_ROUND:
            return [...previousState, gameMessage(`Round ${payload.count} has started.`)]
        case ADD_PLAYER:
            return [...previousState, gameMessage(`${payload.name} has joined.`)]
        case REMOVE_PLAYER:
            return [...previousState, gameMessage(`${payload.name} has left.`)]
        case END_ROOM:
            return [...previousState, gameMessage(`${payload.name} won!`)]
        default:
            return previousState;
    }
};

export default chatReducer;
