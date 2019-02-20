import { JOIN_ROOM_REQUEST__SUCCESS, END_ROOM, LEAVE_ROOM } from './room';

export const START_NEXT_ROUND = 'START_NEXT_ROUND';
export const SET_BONUS_TIME = "SET_BONUS_TIME";

function getEndTime(time){
  let end = new Date();
  end.setSeconds(end.getSeconds() + time);
  return end;
}

const initialState = { count: 0, end: null, picture: null, drawer: null};

const roundReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case JOIN_ROOM_REQUEST__SUCCESS:
            if(payload.round){
              return {
                drawer: payload.round.drawer,
                end: new Date(payload.round.end),
                picture: payload.round.picture,
                count: payload.round.count
              }
            }
            return previousState;
        case START_NEXT_ROUND:
            return {
              ...payload,
              count: previousState.count + 1,
              end: getEndTime(ROUND_TIME_VAR)
            }
        case SET_BONUS_TIME:
            return {
              ...previousState,
              end: getEndTime(BONUS_TIME_VAR)
            }
        case END_ROOM:
            return {
              count: 0,
              end: null,
              picture: null,
              drawer: null
            };
        case LEAVE_ROOM:
            return {
              count: 0,
              end: null,
              picture: null,
              drawer: null
            }
        default:
            return previousState;
    }
};

export default roundReducer;
