import React from 'react';
import { connect } from 'react-redux';

import { handleCreateRoomSubmit } from '../reducers/room';
import Form from '../components/Form';

export default connect(
  ({room}) => ({isLoading: room.isLoading}),
  {onSubmit: handleCreateRoomSubmit}
)(Form)
