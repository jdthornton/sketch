import React from 'react';
import { connect } from 'react-redux';

import { openModal } from './actions';

const Trigger = ({className, openModal, modal, children}) => {
  function handleClick(){
    openModal(modal)
  }
  return(
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

export default connect(
  null,
  {openModal}
)(Trigger);
