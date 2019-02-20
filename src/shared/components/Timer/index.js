import React from 'react';

import styles from './index.css';

class Timer extends React.Component {
  componentDidMount(){
    this.startCountdown();
  }
  componentDidUpdate(prevProps){
    if(this.props.end && (prevProps.end != this.props.end)){
      this.startCountdown();
    }
  }
  startCountdown = () => {
    clearInterval(this.timerId);
    this.rate = 360 / this.getTimeLeft();
    this.timerId = setInterval(this.draw, 250);
  }
  draw = () => {
    var time = this.getTimeLeft();
    var a = 0;
    if(time && time > 0){
      a = (60 - time) * this.rate;
      a %= 360;
    } else {
      clearInterval(this.timerId);
    }
    var r = ( a * Math.PI / 180 );
    var x = Math.sin( r ) * 40
      , y = Math.cos( r ) * - 40
      , mid = ( a > 180 ) ? 1 : 0
      , anim = 'M 0 0 v -40 A 40 40 1 '
             + mid + ' 1 '
             +  x  + ' '
             +  y  + ' z';
    this.loader.setAttribute( 'd', anim );
  }
  getTimeLeft = () => ((this.props.end - Date.now()) / 1000)
  setRef = loader => {this.loader = loader;}
  render(){
    if(this.props.end){
      return(
        <svg className={styles.timer} viewBox="0 0 80 80">
          <path ref={this.setRef} transform="translate(40, 40) "/>
        </svg>
      )
    }
    return null
  }
}

export default Timer;
