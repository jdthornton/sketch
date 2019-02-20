import { connect } from 'react-redux';

import PlayerItem from '../components/PlayerItem';

export default connect(
  ({auth, round, players}, {id}) => ({
    isMe: auth.user.id == id,
    isDrawing: round.drawer && round.drawer.id == id,
    name: players[id].name,
    score: players[id].score
  })
)(PlayerItem);
