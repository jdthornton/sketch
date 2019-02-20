import React from 'react';
import { connect } from 'react-redux';

import RoomItem from '../components/RoomItem';

export default connect(
  ({lobby}, {name}) => ({
      actions: lobby.roomMap[name]
  })
)(RoomItem);
