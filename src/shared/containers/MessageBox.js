import { connect } from 'react-redux';

import MessageBox from '../components/MessageBox';

export default connect(
  ({messages}) => ({messages})
)(MessageBox)
