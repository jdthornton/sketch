import React from 'react';
import { connect } from 'react-redux';

import { handleLoginRequest } from '../reducers/auth';
import Form from '../components/Form';

export default connect(
  ({auth}) => ({isLoading: auth.isLoading}),
  {onSubmit: handleLoginRequest}
)(Form)
