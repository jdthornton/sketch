import React from 'react';

import RoomItem from '../../containers/RoomItem';

import styles from './index.css';

const RoomList = ({rooms, openRoomForm}) =>
    <div className={styles.list}>
      {rooms && rooms.length && rooms.map(room =>
        <RoomItem key={room} name={room} />
      )}
      <div onClick={openRoomForm} className={styles.add}>
        <svg viewBox="0 0 273 190">
          <path d="M40,2 L2,2 L2,40" fill="none" stroke="#ccc" stroke-width="1" />
          <path d="M2,150 L2,188 L40,188" fill="none" stroke="#ccc" stroke-width="1" />
          <path d="M233,188 L271,188 L271,150" fill="none" stroke="#ccc" stroke-width="1" />
          <path d="M271,40 L271,2 L233,2" fill="none" stroke="#ccc" stroke-width="1" />
          <text x="50%" y="50%" alignment-baseline="middle" fill="#ccc" text-anchor="middle">CREATE A ROOM</text>
        </svg>
      </div>
    </div>

export default RoomList;
