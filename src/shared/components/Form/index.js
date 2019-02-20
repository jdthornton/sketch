import React from 'react';

import styles from './index.css';

class Form extends React.Component {
  state = {
    value: ''
  }
  handleChange = e => {
    this.setState({value: e.target.value})
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value)
  }
  render(){
    return(
      <form className={styles.container} onSubmit={this.onSubmit}>
        <input value={this.state.value} onChange={this.handleChange} placeholder={this.props.placeholder} autoFocus="autofocus" />
        <button
          onClick={this.onSubmit}
          className={styles.button}
          type="submit"
        >
          Submit
        </button>
      </form>
    )
  }
}

export default Form;
