import React from 'react';
import { connect } from 'react-redux';

import { setColor } from '../utils/Canvas';
import ColorMenu from '../components/ColorMenu';

export default connect(
  ({drawer, round, auth}) => ({currentColor: drawer.color, isDrawing: (round.drawer && (auth.user.id == round.drawer.id)) ? true : false}),
  { chooseColor: setColor }
)(ColorMenu)
