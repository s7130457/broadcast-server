// const fetch = require('node-fetch')
const express = require('express')
const app = express()

const BroadcastService = require('./broadcast')
const WebSocket = require('ws')

const server = require('http').createServer(app)
// const ws = require('socket.io')(server, {
//   transports: ['websocket', 'polling'],
//   pingInterval: 40000,
//   pingTimeout: 25000,
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// })
app.use(express.static('public'))

let recorder = null
let connectClient = ''

server.listen(3000, () => {
  console.log(`listen 3000`);
  initWS(ws)
})

const ws = new WebSocket.Server({ port: 5000 })

app.get(`/api/broadcast/start`, function (req, res, next) {
  console.log('backend recv broadcast start req!')
  // recorder = new RecoderService()
  connectClient = req.ip
  if (!BroadcastService.status()) {
    BroadcastService.start(connectClient)
    res.status(200).json({data: 'ok'})
  } else {
    res.status(400).json({message: '已經有人正在廣播了，還想廣播？拒絕你！'})
  }
})

app.get(`/api/broadcast/stop`, function (req, res, next) {
  console.log('backend recv broadcast stop req!');
  BroadcastService.stop()
  res.status(200).json({data: 'ok'})
  
})

function initWS (ws) {
  console.log('init ws');
  ws.on('connection', socket => {
    console.log(`client connect`)
    socket.send('something');
    socket.on('broadcast', stream => {
      console.log(`從ws收到資料`);
      console.log(stream);
      // 在停止時，要把它存成音樂檔哦
      // => 所以這邊收到的stream要用個chunk存起來
      
    })
  })
}