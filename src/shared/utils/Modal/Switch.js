import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from './actions';

import styles from './index.css';

class ModalSwitch extends React.Component {
  constructor(){
    super();
    this.content = React.createRef()
  }
  handleClose = (e) => {
    if(this.content.current.contains(e.target)) return

    this.props.closeModal()
  }
  renderModalContent = () => {
    let modal
    React.Children.forEach(this.props.children, child => {
        if (child.props.modal == this.props.modal){
            modal = child
        }
    });
    return modal;
  }
  render(){
    if(this.props.modal){
      return(
        <div onClick={this.handleClose} className={styles.overlay}>
          <div ref={this.content} className={styles.content}>
            {this.renderModalContent()}
          </div>
        </div>
      )
    }
    return null;
  }
}

export default connect(
  ({modal}) => ({modal}),
  {closeModal}
)(ModalSwitch)
