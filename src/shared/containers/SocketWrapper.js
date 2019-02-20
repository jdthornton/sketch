import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import { actions } from '../reducers/socket';

import Lobby from './RoomList';
import Room from './RoomLoader'
import LoginForm from './LoginForm';
import RoomForm from './RoomForm';
import PlayerList from './PlayerList';
import ModalSwitch from '../utils/Modal';
import LoadingCube from '../components/LoadingCube';
import Reconnect from '../components/Reconnect';
import Toaster from '../components/Toaster';



class SocketWrapper extends React.PureComponent {
  componentDidMount(){
    this.props.loadSocket();
  }
  componentWillUnmount(){
    this.props.closeSocket();
  }
  render(){
    if(this.props.connected){
      return(
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Route path="/:room" component={Room} />
          </Switch>
          <ModalSwitch>
            <LoginForm modal="auth" placeholder="Enter A Display Name" />
            <RoomForm modal="create" placeholder="Enter A Room Name" />
            <PlayerList modal="room" />
          </ModalSwitch>
          <Toaster />
        </React.Fragment>
      )
    } else if(this.props.isConnecting){
      return <LoadingCube />
    } else {
      return <Reconnect reconnect={this.props.loadSocket} />
    }
  }
}

export default connect(
  ({socket}) => socket,
  {...actions}
)(SocketWrapper)
