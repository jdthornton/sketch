import Lobby from '../utils/Lobby';

import {
  LOBBY_SUBSCRIPTION_REQUEST__SUCCESS,
  UPDATE_ROOM_ACTIONS
} from '../../shared/reducers/lobby';
import {
  DRAW_ACTION
} from '../../shared/utils/Canvas';
import {
  JOIN_ROOM_REQUEST__FAILURE,
  JOIN_ROOM_REQUEST__SUCCESS,
  CREATE_ROOM_REQUEST__FAILURE,
  CREATE_ROOM_REQUEST__SUCCESS
} from '../../shared/reducers/room';

const roomController = {
  addDrawAction: (client, action) => {
    if(client.room &&
       client.room.round &&
       client.room.round.drawer === client)
    {
      client.room.round.drawActions.push(action);
      client.room.broadcast(DRAW_ACTION, action, client)
      Lobby.broadcast(UPDATE_ROOM_ACTIONS, {name: client.room.name, actions: [action]})
    }
  },
  addPlayer: (client, name) => {
    if(client.user){
      var room = Lobby.getRoom(name);
    	if(room){
        client.room = room;
        let initialData = room.addPlayer(client);
        client.send(JOIN_ROOM_REQUEST__SUCCESS, initialData)
    	} else {
    		client.send(JOIN_ROOM_REQUEST__FAILURE, "That room does not exist")
    	}
    } else {
      client.send(JOIN_ROOM_REQUEST__FAILURE, "You are not authorized")
    }
  },
  removePlayer: (client) => {
    if(client.room){
      if(client.room.host == client){
        Lobby.deleteRoom(client.room.name)
      } else {
        client.room.removePlayer(client);
        client.room = null;
      }
    }
  },
  addLobbySubscription: client => {
    let rooms = Lobby.getRooms();
    client.send(LOBBY_SUBSCRIPTION_REQUEST__SUCCESS, rooms);
    Lobby.subscribe(client);
    client.inLobby = true;
  },
  removeLobbySubscription: client => {
    Lobby.unsubscribe(client);
    client.inLobby = false;
  },
  addMessage: (client, message) => {
    client.room.submitGuess(client, message)
  },
  setTool: (client, tool) => {
    if(client.room && client.room.round){
      client.room.round.currentTool = tool
    }
  },
  setColor: (client, color) => {
    if(client.room && client.room.round){
      client.room.round.currentColor = color
    }
  },
  createRoom: (client, name) => {
    Lobby.createRoom(name, client)
    client.send(CREATE_ROOM_REQUEST__SUCCESS)
  },
  startRoom: (client) => {
    if(client.room && (client == client.room.host)){
      client.room.start()
    }
  }
}

export default roomController;
