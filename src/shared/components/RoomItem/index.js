import React from 'react';
import { Link } from 'react-router-dom';

import { Canvas } from '../../utils/Canvas';

import styles from './index.css';

const RoomItem = ({ name, actions }) =>
  <Link to={"/"+name} className={styles.container}>
    <Canvas actions={actions} className={styles.canvas}/>
    <div className={styles.name}>
      {name}
    </div>
  </Link>

export default RoomItem;
