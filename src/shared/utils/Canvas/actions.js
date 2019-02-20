import Socket from '../Socket';

import {
  SET_TOOL,
  DRAW_ACTION,
  SET_COLOR
} from './types';

export const setTool = payload => {
  Socket.send(SET_TOOL, payload)
  return { type: SET_TOOL, payload }
}

export const clearCanvas = () => {
  Socket.send(DRAW_ACTION, {tool: "CLEAR", data: null});
  return {type: DRAW_ACTION, payload: {tool: "CLEAR", data: null}}
}

export const setColor = payload => {
  Socket.send(SET_COLOR, payload)
  return {type: SET_COLOR, payload}
}
