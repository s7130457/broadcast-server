// const Recorder = require('./recorder').Recorder
console.log('init index.js');
const io = require('socket.io-client')
const socket = io('http://localhost:3000');
// const io = require('socket.io-client')
socket.on('connect', () => {
  console.log('connect')
});
// const socket = io.connect('http://localhost:3000');
// socket.on('connect', () => {
//   console.log('connect')
//   // socket.emit('broadcast',  {msg: '我是從前端ws來的哦'} )
// })
