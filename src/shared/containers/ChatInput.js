import React from 'react';
import { connect } from 'react-redux';

import { handleSubmit } from '../reducers/chat';
import ChatInput from '../components/ChatInput';

export default connect(
  null,
  {onSubmit: handleSubmit}
)(ChatInput)
