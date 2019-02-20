import React from 'react';

import styles from './index.css';

const Reconnect = ({reconnect}) =>
  <div className={styles.container}>
    <div>Unable To Connect</div>
    <div className={styles.btn} onClick={reconnect}>Retry</div>
  </div>

export default Reconnect;
