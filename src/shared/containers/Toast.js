import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { removeToast } from '../reducers/toast';
import Toast from '../components/Toast';

const ToastContainer = ({toasts, className, animations, delay, animationTime, removeToast}) =>
  <TransitionGroup className={className}>
      {toasts.map(toast =>
        <CSSTransition
          key={toast.id}
          classNames={animations}
          timeout={animationTime}
          unmountOnExit
        >
          <Toast id={toast.id} message={toast.message} delay={delay} close={removeToast} />
        </CSSTransition>
      )}
  </TransitionGroup>



export default connect(
  ({toast}) => ({toasts: toast}),
  {removeToast}
)(ToastContainer);
