import React from 'react';
import { Link } from 'react-router-dom';

import Timer from '../../components/Timer';
import { Trigger as ModalTrigger } from '../../utils/Modal'

import styles from './index.css';

function blankCharacters(wordLength){
  var letterCount = '_';
  for(var i = 0; i < wordLength - 1; i++){
    letterCount += ' _';
  }
  return letterCount
}
const RoundDetails = ({ drawer, picture, end, id, winner, isHost, waitingForMorePlayers, count, room, startGame }) =>
  <header>
    {count
      ? <div className={styles.right}>
          <div className={styles.pictureDetails}>
            {drawer.id == id
              ? <div><b>You</b> are drawing<br /> <b className={styles.drawing}>{picture}</b></div>
              : <div><b>{drawer.name}</b> is drawing<br /> <b className={styles.drawing}>{blankCharacters(picture)}</b></div>
            }
          </div>
          <Timer end={end} />
        </div>
      : isHost && !waitingForMorePlayers ? <div onClick={startGame}>Start Game</div> : <div className={styles.loader}></div>
    }
    <ModalTrigger modal="room" className={styles.toggle}>
      <div className={styles.room}>{room}</div>
      <div className={styles.status}>
        {count
          ? "Round "+count
          : winner ? winner+" won" : !waitingForMorePlayers ? "Waiting to start" : "Waiting for more players"
        }
      </div>
    </ModalTrigger>
  </header>



export default RoundDetails;
