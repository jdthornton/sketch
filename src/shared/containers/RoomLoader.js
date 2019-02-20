import React from 'react';
import { connect } from 'react-redux';

import { joinRoom, leaveRoom } from '../reducers/room';
import RoomLayout from '../components/RoomLayout';
import LoadingCube from '../components/LoadingCube';

class RoomLoader extends React.PureComponent {
  componentDidMount(){
    this.props.joinRoom(this.props.match.params.room);
  }
  componentWillUnmount(){
    this.props.leaveRoom();
  }
  render(){
    if(this.props.isLoading) return <LoadingCube />

    return <RoomLayout room={this.props.match.params.room} />
  }
}

export default connect(
  ({room}) => ({isLoading: room.isLoading}),
  {joinRoom, leaveRoom}
)(RoomLoader)
