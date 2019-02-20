import React from 'react';

import styles from './index.css';

const PlayerItem = ({isMe, name, score}) =>
  <div className={isMe ? styles.score+" "+styles.user : styles.score}>
    <span className={styles.name}>{name}</span> <span>{score}</span>
  </div>

export default PlayerItem;
