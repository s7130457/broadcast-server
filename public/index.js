// const Recorder = require('./recorder').Recorder
//  const ws = require('ws')
console.log('init index.js');
const socket = new WebSocket(`ws://localhost:5000`)
socket.onopen = () => {
  console.log(socket)
  console.log('connect')
  socket.send({ data: 'hi' })
}

socket.onmessage = function (evt) {
  var received_msg = evt.data;
  alert("数据已接收...");
}
// const io = require('socket.io-client')
//  const socket = io.connect('http://localhost:3000');
//  console.log(socket)
//  socket.on('connect', () => {
//    console.log('connect')
//    // socket.emit('broadcast',  {msg: '我是從前端ws來的哦'} )
//  })
