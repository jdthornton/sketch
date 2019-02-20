import { connect } from 'react-redux';

import { setTool, clearCanvas } from '../utils/Canvas';
import Tools from '../components/Tools';

export default connect(
  ({drawer, round, auth}) => ({tool: drawer.tool, isDrawing: (round.drawer && (auth.user.id == round.drawer.id)) ? true : false}),
  {setTool: setTool, clearCanvas: clearCanvas}
)(Tools)
