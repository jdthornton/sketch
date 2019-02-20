import React from 'react';

import styles from './index.css';

class MessageBox extends React.PureComponent {
  componentDidUpdate(){
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }
  setRef = node => this.chatContainer = node
  render(){
    let { messages } = this.props;
    return(
      <div className={styles.container} ref={this.setRef}>
        {messages && messages.length > 0 && messages.map(({name, text},i) => (
          <div className={styles.messageContainer} key={i}>
            {name && <span className={styles.userName}>{name}: &nbsp;</span>}
            <span className={!name ? styles.announcement : styles.messageText}>{text}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default MessageBox;
