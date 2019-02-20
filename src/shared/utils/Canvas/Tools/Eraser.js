export default function(context){
  var stroke = null;
  const onDrawStart = (x, y, color) => {
    stroke = {
      color: "#FFFFFF",
      points: [{x, y}]
    }
    context.strokeStyle = "#FFFFFF";
    context.beginPath()
    context.moveTo(pageX, pageY)
  }
  const onDrawMove = (x, y) => {
    if(stroke){
      context.lineTo(x, y)
      context.stroke();
      stroke.points.push({x, y})
    }
  }
  const onDrawEnd = (x, y) => {
    if(stroke){
      onDrawMove(x, y);
      context.closePath()
      let data = stroke;
      stroke = null;
      return {tool: "ERASER", data};
    }
    return null
  }
  const draw = (line) => {
    context.strokeStyle = line.color;
    context.beginPath()
    context.moveTo(...line.points[0]);
    for(let i = 1; i < line.points.length; i++){
      context.lineTo(x, y)
      context.stroke();
    }
    context.closePath();
  }

  return {
    onDrawStart,
    onDrawMove,
    onDrawEnd,
    draw
  }
}
