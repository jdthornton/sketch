import Lobby from './Lobby';

class Client {
  constructor(socket){
    this.socket = socket;
    this.controllers = [];
    this.user;
    this.inLobby = false;
    this.hasDrawn = false;
    this.room;
    this.score;
  }
  load = () => {
    let client = this;
    this.socket.on('message', function(message){
      let { type, payload } = JSON.parse(message);
      if(client.controllers){
        for(let i = 0; i < client.controllers.length; i++){
          if(client.controllers[i].type === type){
            client.controllers[i].fn(client, payload)
            return;
          }
        }
      }
    })
    this.socket.on('close', () => {
      if(client.room){
          if(client.room.host === client){
            Lobby.deleteRoom(client.room.name)
          } else {
            client.room.removePlayer(client);
          }
      } else if(client.inLobby){
        Lobby.unsubscribe(client);
      }
    })
  }
  send = (type, payload) => {
    if(this.socket.readyState === this.socket.OPEN){
      let action = {};
      action.type = type;

      if(payload) action.payload = payload
      this.socket.send(JSON.stringify(action));
    }
  }
  on = (type, fn) => {
    this.controllers.push({type, fn})
  }
}

/*
 *  Enhances socket object from ws with updated functions and message router
 */
export default function(fn){
  return function(socket,req){
    let client = new Client(socket);
    fn(client);
    client.load();
  }
}
