
// require.config = ({
//   baseUrl: './scripts', // 定義所有JS文件的基本路徑,可跟script標簽的data-main有相同的根路徑
// 	paths: {
//     jquery: ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'],
//     recoder: 'works/recoder',
//     'socket.io-client': 'https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js'



//   } 
  



// })

 
// require(['jquery', 'recoder', 'socket.io-client'],function($, Recoder, io){
// 	require(['index']);
// })



define(function(require, exports, module) {
  var io = require('socket.io-client'),
      b = require('./works/recorder');
  const socket = io('http://127.0.0.1:3000')
  console.log(socket);
   
  //Return the module value
  return function () {};
}
);


// $(document).ready(function () {
//   // const socket = io();
//   console.log('印個東西吧，讓我知道你在動');

// })

/**
 * 
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
 */
