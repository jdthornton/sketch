import React from 'react';

import Socket from '../Socket';
import Pencil from './Tools/Pencil';
import Flood from './Tools/Flood';
import Clear from './Tools/Clear';
import Eraser from './Tools/Eraser';

export const TOOL_MAP = {
  PENCIL: Pencil,
  ERASER: Eraser,
  CLEAR: Clear,
  FLOOD: Flood
}

export default class Canvas extends React.PureComponent {
  constructor(props){
    super(props);
    this.container = React.createRef();
  }
  componentDidMount(){
    this.setDimensions();
    this.props.actions
      .forEach(action => {
        this.initTool(action.tool);
        this.tool.draw(action.width
          ? this.scaleDrawAction(action)
          : action.data
        );
      })
    this.initTool(this.props.tool)
    window.addEventListener('resize', (e) => {this.resizeThrottler(e)}, false);
  }
  componentDidUpdate({actions, tool}){
    if(actions !== this.props.actions){
      this.props.actions
        .filter(action => actions.indexOf(action) == -1)
        .forEach(action => {
          this.initTool(action.tool);
          this.tool.draw(action.width
            ? this.scaleDrawAction(action)
            : action.data
          );
        })
        this.initTool(this.props.tool)
    }
    if(tool != this.props.tool){
      this.initTool(this.props.tool);
    }
  }
  componentWillUnmount(){
    if(this.resizeTimeout){
      clearTimeout(this.resizeTimeout)
    }
    window.removeEventListener('resize', this.resizeThrottler, false);
  }
  setDimensions = () => {
    this.ctx.canvas.width = this.container.current.clientWidth;
    this.ctx.canvas.height = this.container.current.clientHeight;
  }
  resizeThrottler = (e) => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.setDimensions, 500);
  }
  saveContext = ctx => {this.ctx = ctx;}
  initTool = (tool) => {
    this.tool = TOOL_MAP[tool](this.ctx);
  }
  handleClickStart = (e) => {
    e.preventDefault();
    if(this.props.isDrawing){
      this.tool.onDrawStart(...this.getCursorPosition(e), this.props.color);
    }
  }
  handleClickMove = (e) => {
    e.preventDefault();
    if(this.props.isDrawing){
      this.tool.onDrawMove(...this.getCursorPosition(e));
    }
  }

  handleClickEnd = (e) => {
    e.preventDefault()
    if(this.props.isDrawing){
      let action = this.tool.onDrawEnd(...this.getCursorPosition(e));
      action.width = this.ctx.canvas.width;
      if(this.props.isEmitting){
        Socket.send('DRAW_ACTION', action)
      }
    }
  }
  getCursorPosition = (e) => {
    const {top, left} = this.ctx.canvas.getBoundingClientRect();
    let x, y;
    if(e.clientX){
      x = e.clientX;
      y = e.clientY;
    } else if(e.touches[0]) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if(e.changedTouches[0]){
      x = e.changedTouches[e.changedTouches.length-1].clientX
      y = e.changedTouches[e.changedTouches.length-1].clientY
    }
    return [
      x - left,
      y - top
    ];
  }
  scaleDrawAction = action => {
    let ratio = this.ctx.canvas.width / action.width;
    return {
      color: action.data.color,
      points: action.data.points.map(({x, y}) => ({x: x*ratio, y: y*ratio}))
    }
  }
  render(){
    return(
      <div className={this.props.className} ref={this.container}>
        <PureCanvas
          contextRef={this.saveContext}
          onMouseDown={this.handleClickStart}
          onMouseMove={this.handleClickMove}
          onMouseUp={this.handleClickEnd}
          onTouchStart={this.handleClickStart}
          onTouchMove={this.handleClickMove}
          onTouchEnd={this.handleClickEnd}
        />
      </div>
    )
  }
  static defaultProps = {
    tool: "PENCIL"
  }
}

class PureCanvas extends React.Component {
  shouldComponentUpdate({width,height}){
    return false
  }
  render(){
    return(
      <canvas ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
        {...this.props} />
    )
  }
}
