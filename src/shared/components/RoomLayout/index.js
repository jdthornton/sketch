import React from 'react';

import RoundDetails from '../../containers/RoundDetails';
import { CanvasContainer } from '../../utils/Canvas';
import MessageBoxContainer from '../../containers/MessageBox';
import ChatInputContainer from '../../containers/ChatInput';
import ToolsContainer from '../../containers/Tools';
import ColorMenuContainer from '../../containers/ColorMenu';

import styles from './index.css';

const RoomLayout = ({room}) =>
  <React.Fragment>
    <RoundDetails room={room} />
    <aside>
        <MessageBoxContainer />
        <ChatInputContainer />
    </aside>
    <div className={styles.drawer}>
      <CanvasContainer className={styles.canvas}/>
      <div className={styles.toolbar}>
        <ToolsContainer />
        <ColorMenuContainer />
      </div>
    </div>
    <div className={styles.screenLock}>Please rotate your screen</div>
  </React.Fragment>

export default RoomLayout;
