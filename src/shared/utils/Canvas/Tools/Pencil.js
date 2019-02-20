export default function(context){
  var stroke = null;
  const onDrawStart = (x, y, color) => {
    stroke = {
      color,
      points: [{x, y}]
    }
    context.strokeStyle = color;
    context.beginPath()
    context.moveTo(x, y)
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
      return {tool: "PENCIL", data};
    }
    return null
  }
  const draw = (line) => {
    context.strokeStyle = line.color;
    context.beginPath()
    context.moveTo(line.points[0].x,line.points[0].y);
    for(let i = 1; i < line.points.length; i++){
      let {x, y} = line.points[i];
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
