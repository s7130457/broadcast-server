const express = require('express')
const app = express()
const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 5000 })
const cors = require('cors')
const fs = require('fs')
const BroadcastService = require('./broadcast')
let wstream;

const server = require('http').createServer(app)
app.use(cors())

app.use(express.static('public'))

let connectClient = ''

server.listen(3000, () => {
  console.log(`listen 3000`);
  initWS(ws)
})


app.get(`/api/broadcast/start`, function (req, res, next) {
  console.log('backend recv broadcast start req!')
  // recorder = new RecoderService()
  connectClient = req.ip
  if (!BroadcastService.status()) {
    res.status(200).json({ data: 'ok' })

    BroadcastService.start(connectClient)
  } else {
    res.status(400).json({ message: '已經有人正在廣播了，還想廣播？拒絕你！' })
  }
})

app.get(`/api/broadcast/stop`, function (req, res, next) {
  console.log('backend recv broadcast stop req!');
  BroadcastService.stop()
  res.status(200).json({ data: 'ok' })
})

function initWS(ws) {
  console.log('init ws');
  ws.on('connection', socket => {
    console.log(`client connect`)
    wstream = fs.createWriteStream('test.wav')
    socket.on('message', data => {
      // 一開始的data不知道為什麼一定要跟client的onopen時，ws send過來的一樣
      if (data === 'connect') {
        console.log(`打招呼～`);
      } 
      
      if (data === '停止錄音') {
        console.log(`停止錄音～`);
        wstream.end();
      } else {
        console.log(`從ws收到資料`);
        wstream.write(data)
        console.log(data);
      }
    })
  })
}