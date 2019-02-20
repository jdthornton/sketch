import React from 'react';
import { connect } from 'react-redux';

import { startGame } from '../reducers/room';
import RoundDetails from '../components/RoundDetails';

export default connect(
  ({auth, room, players, round}) => ({
    id: auth.user ? auth.user.id : null,
    winner: room.winner,
    isHost: room.host == auth.user.id,
    waitingForMorePlayers: Object.keys(players).length < 2,
    ...round
  }),
  { startGame: startGame }
)(RoundDetails)
