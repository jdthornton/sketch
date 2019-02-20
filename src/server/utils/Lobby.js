import Room from './Room';
import {
  REMOVE_ROOM_FROM_LOBBY,
  ADD_ROOM_TO_LOBBY,
} from '../../shared/reducers/lobby';
import {
  ROOM_HOST_LEFT
} from '../../shared/reducers/room';

function Lobby(){
  // Default rooms
  this.games = new Map([
    ["easy", new Room("easy")]
  ])
  this.subscribers = []
}


/*
 *  Creates a room and broadcasts the name to lobby
 */
Lobby.prototype.createRoom = function(name, host){
  if(!this.games.has(name)){
    let gameInstance = new Room(name, host);
    this.games.set(name, gameInstance)
    this.broadcast(ADD_ROOM_TO_LOBBY, name);
  }
}

/*
 *  Returns a room map containing the draw actions from the current round of each room
 *  (Client will then update this map from the data recieved from its lobby subscription)
 */
Lobby.prototype.getRooms = function(){
  let roomMap = {}
  this.games.forEach((value, key) => {
    if(value.players.length < 8){
      roomMap[key] = value.round ? value.round.drawActions : []
    }
  });
  return roomMap;
}

/*
 *  Deletes room and broadcasts to all players that the room host has left
 */
Lobby.prototype.deleteRoom = function(name){
  this.broadcast(REMOVE_ROOM_FROM_LOBBY, name);

  let game = this.games.get(name);
  game.broadcast(ROOM_HOST_LEFT);
  for(let i = 0; i < game.players.length; i++){
    game.players[i].room = null;
  }
  this.games.delete(name);
}

Lobby.prototype.getRoom = function(name){
  return this.games.get(name)
}

Lobby.prototype.subscribe = function(socket){
  this.subscribers.push(socket);
}

Lobby.prototype.unsubscribe = function(socket){
  let index = this.subscribers.indexOf(socket);
  this.subscribers.splice(index, 1);
}


Lobby.prototype.broadcast = function(type, payload){
  for(let i = 0; i < this.subscribers.length; i++){
    this.subscribers[i].send(type, payload);
  }
}

let lobbyInstance = new Lobby();

export default lobbyInstance;
