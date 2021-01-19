// const socket = new BinaryClient('ws://localhost:5000');
const socket = new WebSocket('ws://localhost:5000');
socket.binaryType = 'arraybuffer'
socket.onopen = function () {
  console.log(socket);
  console.log('connect');
  socket.send('打招呼')

};

socket.onmessage = function (evt) {
  var received_msg = evt.data;
  console.log(evt);

  alert("数据已接收...");
};

// socket.on('open', () => {
//   console.log('on open');
  
//   // for the sake of this example let's put the stream in the window
//   window.Stream = socket.createStream()
// })