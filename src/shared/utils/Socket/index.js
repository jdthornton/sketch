function Socket(){
  this.connection;
  this.timer;
}

Socket.prototype.init = function(URL){
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  // if browser doesn't support WebSocket, just show
  // some notification and exit
  if (!window.WebSocket) {
    alert('WebSockets not supported by browser');
    return;
  }
  this.connection = new WebSocket(URL);

  window.onbeforeunload = function(e){ this.close(); };
}


Socket.prototype.send = function(type, payload){
  this.connection.send(JSON.stringify({type: type, payload: payload}))
}

Socket.prototype.close = function(){
  this.connection.close();
}

const SocketInstance = new Socket();

export default SocketInstance;
