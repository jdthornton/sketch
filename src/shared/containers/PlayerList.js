import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../utils/Modal';
import PlayerList from '../components/PlayerList';

export default connect(
  ({players, auth, round, room}) => ({id: auth.user.id, round: round.count, winner: room.winner, players}),
  {closeModal}
)(PlayerList)
