const DRAWINGS = [
  'penguin',
  'cookie',
  'monkey',
  'apple',
  'horse',
  'robot',
  'boots',
  'moon',
  'pie'
]

import {
  SET_BONUS_TIME
} from '../../shared/reducers/round';

class Round {
  constructor(points, drawer, nextRound){
    this.timerId = null
    this.picture = null;
    this.endDate = null;
    this.drawer = drawer;
    this.points = points + 1;
    this.nextRound = nextRound;
    this.alreadyGuessed = [];
    this.drawActions = [];
    this.currentColor = "#111111";
    this.currentTool = "PENCIL";
    this.setRoundTime = this.setRoundTime.bind(this)
    this.submitGuess = this.submitGuess.bind(this);
    this.start();
  }

  /*
   * Starts the round by setting the round picture and setting the round end time
   */
  start(){
    this.picture = DRAWINGS[Math.floor(Math.random()*DRAWINGS.length)];
    this.setRoundTime(ROUND_TIME_VAR)
  }

  /*
   *  Updates the round end time
   */
  setRoundTime(seconds){
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.nextRound,seconds*1000);
    var d = new Date();
    d.setSeconds(d.getSeconds() + seconds);
    this.endDate = d;
  }

  /*
   *  Checks whether a player guess is correct and what to award them in points
   */
  submitGuess(player, guess, broadcast){
    if(guess.toLowerCase() == this.picture ){
      if(player !== this.drawer && this.alreadyGuessed.indexOf(player) == -1){
        this.drawer.score++;
        if(!this.alreadyGuessed.length){
          this.setRoundTime(BONUS_TIME_VAR)
          broadcast(SET_BONUS_TIME)
        }
        this.alreadyGuessed.push(player)
        return this.points - this.alreadyGuessed.length;
      }
      return -1; //User has already recieved points this round but we want to make sure we don't broadcast the correct answer
    }
    return 0; //Just a message
  }
  end(){
    clearTimeout(this.timerId);
  }
}

export default Round;
