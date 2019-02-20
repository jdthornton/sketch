import Round from './Round';
import Lobby from './Lobby';

import {
  JOIN_ROOM__SUCCESS,
  END_ROOM,
  START_ROOM
} from '../../shared/reducers/room';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_SCORES
} from '../../shared/reducers/players';
import {
  START_NEXT_ROUND
} from '../../shared/reducers/round';
import {
  UPDATE_ROOM_ACTIONS
} from '../../shared/reducers/lobby';
import {
  ADD_MESSAGE
} from '../../shared/reducers/chat';

class Room {
  constructor(name, host){
    this.players = [];
    this.hasDrawn = [];
    this.roundCount = 0;
    this.round = null
    this.inProgress = false
    this.broadcast = this.broadcast.bind(this);
    this.host = host;
    this.name = name;
  }

  start(){
    this.broadcast(START_ROOM);
    this.inProgress = true;
    for(var i = 0; i < this.players.length; i++){
      this.players[i].score = 0;
      this.players[i].hasDrawn = 0;
    }
    this.nextRound();
  }

  /*
   * Will broadcast to all players in the room except for the sender
   * (sender is optional and will broadcast to all players if left empty)
   */
  broadcast(type, payload, sender){
    for(var i = 0; i < this.players.length; i++){
      if(this.players[i] && this.players[i] !== sender){
        this.players[i].send(type, payload);
      }
    }
  }

  /*
   *  Finds the next drawer and starts next round if there are more rounds to be played
   */
  nextRound(){
    if(this.roundCount < MAX_ROUNDS_VAR ){
      this.roundCount++;
      let drawer = this.findNextDrawer();
      this.round = new Round(this.players.length, drawer, this.nextRound.bind(this));

      //Send next round info to all players but only send the round picture string to the drawer
      drawer.send(START_NEXT_ROUND, {drawer: drawer.user, picture: this.round.picture, count: this.roundCount, end: this.round.endDate})
      this.broadcast(START_NEXT_ROUND, {drawer: drawer.user, picture: this.round.picture.length, count: this.roundCount, end: this.round.endDate}, drawer)

      //Sends a clear drawing action to lobby
      Lobby.broadcast(UPDATE_ROOM_ACTIONS, {name: this.name, actions: [{tool: "CLEAR"}]})
    } else {
      this.end()
    }
  }

  /*
   *  Adds player to room and will start non player created rooms when going from 1 to 2 players
   */
  addPlayer(player){
    player.hasDrawn = false;
    player.score = 0;
    this.players.push(player);
    this.broadcast(ADD_PLAYER, player.user, player);
    if(!this.inProgress && !this.host && this.players.length > 1){
      this.start()
    }
    return this.getRoomData()
  }

  /*
   *  Removes player and ends the game if it is not player created and there is only one player left
   */
  removePlayer(player){
    let idx = this.players.indexOf(player);
    if(idx !== -1){
      this.players.splice(idx, 1);
      if(!this.host && this.players.length < 2 && this.inProgress){
        this.end();
      } else if(this.round && (player === this.round.drawer)) {
        this.round.end();
        this.nextRound();
      }
      this.broadcast(REMOVE_PLAYER, player.user, player);
    }
  }

  /*
   *  Takes a message and broadcasts it if it matches the current rounds picture string or updates the players score if it matches
   */
  submitGuess(player, guess){
    if(!this.round){
      this.broadcast(ADD_MESSAGE,{name: player.user.name, text: guess}, player)
      return;
    }
    var pointsAwarded = this.round.submitGuess(player, guess, this.broadcast);
    if(pointsAwarded > 0){
      player.score += pointsAwarded;
      this.broadcast(UPDATE_SCORES, {guesser: {...player.user, points: pointsAwarded}, drawer: this.round.drawer.user.id});
    } else if(pointsAwarded == 0){
      this.broadcast(ADD_MESSAGE,{name: player.user.name, text: guess}, player)
    }
  }

  /*
   *  Gets the initial room data a player needs when joining the room
   */
  getRoomData(player){
    let players = {}
    for(var i = 0; i < this.players.length; i++){
      let { user, score } = this.players[i];
      players[user.id] = { ...user, score };
    }
    let roomInfo = {
      players: players,
      host: this.host ? this.host.user.id : null
    }
    if(this.roundCount > 0){
      roomInfo.round = {
        count: this.roundCount,
        drawer: this.round.drawer.user,
        picture: this.round.picture.length,
        end: this.round.endDate.toJSON()
      }
      roomInfo.canvas = {
        actions: this.round.drawActions,
        color: this.round.currentColor,
        tool: this.round.currentTool
      }
    }
    return roomInfo
  }

  /*
   *  Finds the next drawer and records who has drawn and who hasnt
   */
  findNextDrawer(){
    for(let i = 0; i < this.players.length; i++){
      if(this.players[i] && !this.players[i].hasDrawn){
        this.players[i].hasDrawn = true;
        return this.players[i];
      }
    }
    for(let i = 1; i < this.players.length; i++){
      this.players[i].hasDrawn = false;
    }
    return this.players[0]
  }

  /*
   *  Ends the game and broadcasts the winner
   */
  end(){
    this.inProgress = false;
    this.roundCount = 0;
    this.round.end();
    this.round = null;
    this.broadcast(END_ROOM, this.players.reduce((acc, cur) => cur.score > acc.score ? cur.user : acc).user);
    if(!this.host){
      setTimeout(() => {
        if(this.players.length > 1){
          this.start()
        }
      },30*1000);
    }
  }
}

export default Room;
