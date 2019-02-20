import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../reducers/lobby';
import { openRoomForm } from '../reducers/room';
import RoomList from '../components/RoomList';

class RoomListContainer extends React.Component {
  componentDidMount(){
    this.props.subscribe();
  }
  componentWillUnmount(){
    this.props.unsubscribe();
  }
  render(){
    let { isLoading, rooms, openRoomForm } = this.props;
    if(isLoading){
      return <div>Loading</div>
    }
    return <RoomList rooms={rooms} openRoomForm={openRoomForm} />
  }
}

export default connect(
  ({lobby}) => ({isLoading: lobby.isLoading, rooms: lobby.roomNames}),
  {...actions, openRoomForm }
)(RoomListContainer);
