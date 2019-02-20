const colorMap = {
  '#111111': [17,17,17,255],
  '#AAAAAA': [170,170,170,255],
  '#FFFFFF': [255,255,255,255],
  "#001f3f": [0,31,63,255],
  "#0074D9": [0,116,217,255],
  "#7FDBFF": [127,219,255,255],
  "#39CCCC": [57,204,204,255],
  "#3D9970": [61,153,112,255],
  "#2ECC40": [46,204,64,255],
  "#01FF70": [1,255,112,255],
  "#FFDC00": [255,220,0,255],
  "#FF851B": [255,133,27,255],
  "#FF4136": [255,65,54,255],
  "#85144b": [133,20,75,255],
  "#F012BE": [240,18,190,255],
  "#B10DC9": [177,13,201,255]
}

export default function(context){
  var floodColor = null;
  const onDrawStart = (x, y, color) => {
    floodColor = color;
  }
  const onDrawMove = () => null
  const onDrawEnd = (x, y) => {
    draw({points: [{x: x, y: y}], color: floodColor});
    return {tool: "FLOOD", data: {points: [{x: x, y: y}], color: floodColor}}
  }
  const draw = ({points, color}) => {
    var imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    floodFill(points[0].x, points[0].y, colorMap[color], false, imgData, 0);
    context.putImageData(imgData, 0, 0);
  }
  const floodFill = (posX, posY, RGBA, diagonal,imgData,tolerance,antiAlias) => {
    var data = imgData.data; // image data to fill;
    antiAlias = true;
    var stack = [];          // paint stack to find new pixels to paint
    var lookLeft = false;    // test directions
    var lookRight = false;
    var w = imgData.width;   // width and height
    var h = imgData.height;
    var painted = new Uint8ClampedArray(w*h);  // byte array to mark painted area;
    var dw = w*4; // data width.
    var x = Math.ceil(posX);
    var y = Math.ceil(posY);
    var ind = y * dw + x * 4;  // get the starting pixel index
    var sr = data[ind];        // get the start colour tha we will use tollerance against.
    var sg = data[ind+1];
    var sb = data[ind+2];
    var sa = data[ind+3];
    var sp = 0;
    var dontPaint = false;  // flag to indicate if checkColour can paint

    // function checks a pixel colour passes tollerance, is painted, or out of bounds.
    // if the pixel is over tollerance and not painted set it do reduce anti alising artifacts
    var checkColour = function(x,y){
        if( x<0 || y < 0 || y >=h || x >= w){  // test bounds
            return false;
        }
        var ind = y * dw + x * 4;  // get index of pixel
        var dif = Math.max(        // get the max channel differance;
            Math.abs(sr-data[ind]),
            Math.abs(sg-data[ind+1]),
            Math.abs(sb-data[ind+2]),
            Math.abs(sa-data[ind+3])
        );
        if(dif < tolerance){         // if under tollerance pass it
            dif = 0;
        }
        var paint = Math.abs(sp-painted[y * w + x]); // is it already painted
        if(antiAlias && !dontPaint){  // mitigate anti aliasing effect
            // if failed tollerance and has not been painted set the pixel to
            // reduce anti alising artifact
            if(dif !== 0 && paint !== 255){
                data[ind] = RGBA[0];
                data[ind+1] = RGBA[1];
                data[ind+2] = RGBA[2];
                data[ind+3] = (RGBA[3]+data[ind+3])/2; // blend the alpha channel
                painted[y * w + x] = 255;  // flag pixel as painted
            }
        }
        return (dif+paint)===0?true:false;  // return tollerance status;
    }
    // set a pixel and flag it as painted;
    var setPixel = function(x,y){
        var ind = y * dw + x * 4;  // get index;
        data[ind] = RGBA[0];       // set RGBA
        data[ind+1] = RGBA[1];
        data[ind+2] = RGBA[2];
        data[ind+3] = RGBA[3];
        painted[y * w + x] = 255;   // 255 or any number >0 will do;
    }


    stack.push([x,y]);  // push the first pixel to paint onto the paint stack

    while (stack.length) {   // do while pixels on the stack
        var pos = stack.pop();  // get the pixel
        x = pos[0];
        y = pos[1];
        dontPaint = true;    // turn off anti alising
        while (checkColour(x,y-1)) {  // find the bottom most pixel within tolerance;
            y -= 1;
        }
        dontPaint = false;    // turn on anti alising if being used
        //checkTop left and right if alowing diagonal painting
        if(diagonal){
            if(!checkColour(x-1,y) && checkColour(x-1,y-1)){
                stack.push([x-1,y-1]);
            }
            if(!checkColour(x+1,y) && checkColour(x+1,y-1)){
                stack.push([x+1,y-1]);
            }
        }
        lookLeft = false;  // set look directions
        lookRight = false; // only look is a pixel left or right was blocked
        while (checkColour(x,y)) { // move up till no more room
            setPixel(x,y);         // set the pixel
            if (checkColour(x - 1,y)) {  // check left is blocked
                if (!lookLeft) {
                    stack.push([x - 1, y]);  // push a new area to fill if found
                    lookLeft = true;
                }
            } else
            if (lookLeft) {
                lookLeft = false;
            }
            if (checkColour(x+1,y)) {  // check right is blocked
                if (!lookRight) {
                    stack.push([x + 1, y]); // push a new area to fill if found
                    lookRight = true;
                }
            } else
            if (lookRight) {
                lookRight = false;
            }
            y += 1;                 // move up one pixel
        }
        // check down left
        if(diagonal){  // check for diagnal areas and push them to be painted
            if(checkColour(x-1,y) && !lookLeft){
                stack.push([x-1,y]);
            }
            if(checkColour(x+1,y) && !lookRight){
                stack.push([x+1,y]);
            }
        }

    }

  }

  return {
    onDrawStart,
    onDrawMove,
    onDrawEnd,
    draw
  }
}
