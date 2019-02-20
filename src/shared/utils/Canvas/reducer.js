import {
  SET_TOOL,
  SET_COLOR,
  DRAW_ACTION,
  LOAD_PICTURE
} from './types';
import { clearCanvas } from './actions';
import { START_NEXT_ROUND } from '../../reducers/round';
import { JOIN_ROOM_REQUEST__SUCCESS } from '../../reducers/room';

const initialState = { color: "#111111", tool: 'PENCIL', actions: [] };

const drawerReducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case SET_TOOL:
            return {
              ...previousState,
              tool: payload
            }
        case SET_COLOR:
            return {
              ...previousState,
              color: payload
            }
        case DRAW_ACTION:
            return {
              ...previousState,
              actions: [...previousState.actions, payload]
            }
        case START_NEXT_ROUND:
            return {
              ...previousState,
              actions: [clearCanvas().payload]
            }
        case LOAD_PICTURE:
          return {
            ...previousState,
            actions: payload
          }
        case JOIN_ROOM_REQUEST__SUCCESS:
          return {
            ...previousState,
            ...payload.canvas
          }
        default:
            return previousState;
    }
};

export default drawerReducer;
