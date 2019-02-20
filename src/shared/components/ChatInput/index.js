import React from 'react';

import styles from './index.css';

class ChatInput extends React.Component {
  state = {
    value: ''
  }
  handleChange = e => {
    this.setState({value: e.target.value})
  }
  handleSubmit = e => {
    this.props.onSubmit(this.state.value)
    this.setState({value: ''})
    e.preventDefault();
  }
  render(){
    return(
      <form className={styles.container} autoComplete="off" onSubmit={this.handleSubmit}>
        <input value={this.state.value} onChange={this.handleChange} className={styles.input} type='text' placeholder="Take a guess or message other players"/>
        <svg className={styles.button} width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </form>
    )
  }
}

export default ChatInput
