export default function(context){
  const onDrawStart = () => null
  const onDrawMove = () => null
  const onDrawEnd = () => {
    draw();
    return {tool: "CLEAR", data: null}
  }
  const draw = () => {
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
  }
  return {
    onDrawStart,
    onDrawMove,
    onDrawEnd,
    draw
  }
}
