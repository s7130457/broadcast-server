const express = require('express')
const app = express()
const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 5000 })
const cors = require('cors')
const AudioBuffer = require('audiobuffer')
const fs = require('fs')
const toWav = require('audiobuffer-to-wav')

const BroadcastService = require('./broadcast')

const server = require('http').createServer(app)
app.use(cors())

app.use(express.static('public'))

let recorder = null
let connectClient = ''
let audioBuffer = null
let chunks = []

server.listen(3000, () => {
  console.log(`listen 3000`);
  initWS(ws)
})


app.get(`/api/broadcast/start`, function (req, res, next) {
  console.log('backend recv broadcast start req!')
  // recorder = new RecoderService()
  connectClient = req.ip
  if (!BroadcastService.status()) {
    res.status(200).json({data: 'ok'})
    
    BroadcastService.start(connectClient)
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
    // socket.send('something');
    socket.on('message', data => {
      if (data === '打招呼') {
        chunks = []
        console.log(`ws寄中斷點過來囉～`);
        
      } else {
        console.log(`從ws收到資料`);
        console.log(data);
        
        // let wav = toWav(data)
        let chunk = new Uint8Array(data)
        // audioBuffer = new AudioBuffer(4096, 48000, 2)
        console.log(chunk);
        fs.appendFileSync('test.wav', Buffer.from(chunk))
        // 在停止時，要把它存成音樂檔哦
        // => 所以這邊收到的stream要用個chunk存起來
      }
      
    })
  })
}