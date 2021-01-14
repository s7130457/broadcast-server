const recoder = require('./recorder')
console.log(recoder);

const socket = new WebSocket(`ws://localhost:5000`)
socket.onopen = () => {
  console.log(socket)
  console.log('connect')
  socket.send({data: 'hi'})
}

socket.onmessage = function (evt) {
  var received_msg = evt.data;
  console.log(evt);
  
  alert("数据已接收...");
}