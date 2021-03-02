const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const BroadcastService = require('./broadcast')
const WebRTCService = require('./webrtc')


const server = require('http').createServer(app)
app.use(cors())

app.use(express.static('public'))

server.listen(3000, () => {
  console.log(`listen 3000`);
})


app.get(`/api/webrtc/connection`, async function (req, res, next) {
  // const clientPeer = await WebRTCService.connect() 
  const id = WebRTCService.peerId 
  console.log('connect');
  res.status(200).json({id})
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