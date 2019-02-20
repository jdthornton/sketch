import { connect } from 'react-redux';

import Canvas from './Canvas';

export default connect(
  ({players, round, auth, drawer}) => ({
    isDrawing: (Object.keys(players).length < 2 || (round.drawer && (auth.user.id == round.drawer.id))) ? true : false,
    isEmitting: (round.drawer && (auth.user.id == round.drawer.id)) ? true : false,
    ...drawer
  })
)(Canvas);
