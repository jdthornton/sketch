import lobbyReducer from './lobby';
import roomReducer from './room';
import authReducer from './auth';
import playersReducer from './players';
import chatReducer from './chat';
import roundReducer from './round';
import socketReducer from './socket';
import { reducer as canvasReducer } from '../utils/Canvas';
import { reducer as modalReducer } from '../utils/Modal';
import toast from './toast';

export default {
  lobby: lobbyReducer,
  auth: authReducer,
  room: roomReducer,
  drawer: canvasReducer,
  messages: chatReducer,
  players: playersReducer,
  round: roundReducer,
  socket: socketReducer,
  modal: modalReducer,
  toast
}
