import roomController from '../controllers/room';
import authController from '../controllers/auth';
import connectSocket from '../utils/socket';

function routes(socket){
  socket.on('TOKEN_REQUEST', authController.getToken);
	socket.on('AUTHORIZATION_REQUEST', authController.authenticate);
	socket.on('DRAW_ACTION', roomController.addDrawAction);
	socket.on('LOBBY_SUBSCRIPTION_REQUEST', roomController.addLobbySubscription);
	socket.on('UNSUBSCRIBE_FROM_LOBBY', roomController.removeLobbySubscription);
	socket.on('JOIN_ROOM_REQUEST', roomController.addPlayer);
	socket.on('SUBMIT_MESSAGE', roomController.addMessage);
	socket.on('SET_TOOL', roomController.setTool);
	socket.on('SET_COLOR', roomController.setColor);
	socket.on('LEAVE_ROOM', roomController.removePlayer)
	socket.on('CREATE_ROOM_REQUEST', roomController.createRoom)
	socket.on('START_ROOM', roomController.startRoom)
}


export default connectSocket(routes)
