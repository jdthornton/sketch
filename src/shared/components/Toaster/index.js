import React from 'react';

import Toast from '../../containers/Toast';
import styles from './index.css';

const Toaster = () =>
  <Toast
    className={styles.toastList}
    animations={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      exit: styles.exit,
      exitActive: styles.exitActive
    }}
    animationTime={300}
    delay={2500}
  />

export default Toaster
