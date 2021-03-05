const wrtc = require('wrtc')
const fetch = require('node-fetch')
const WebSocket = require('ws')
const SimplePeerJs = require('simple-peerjs')
const { RtAudio, RtAudioFormat, RtAudioApi, RtAudioStreamFlags } = require('audify')
const { PassThrough } = require('stream').PassThrough
const Transform = require('stream').Transform
const util = require('util')

// const rtAudio = new RtAudio(RtAudioApi.LINUX_ALSA)
const rtAudio = new RtAudio(RtAudioApi.MACOSX_CORE)

const BUFFER_SIZE = 512
// NOTE: 因為丟到底層的 size = buffer * 4，不知道 udp 會收到多長的情況下做一個 Chunk 來切送到底層的資料
function Chunk(size) {
  this.splitSize = size
  this.buffer = Buffer.alloc(0)
  Transform.call(this)
}

util.inherits(Chunk, Transform)

Chunk.prototype._transform = function (chunk, encoding, cb) {
  this.buffer = Buffer.concat([this.buffer, chunk])
  while (this.buffer.length > this.splitSize) {
    let chunk = this.buffer.slice(0, this.splitSize)
    this.push(chunk)
    this.buffer = this.buffer.slice(this.splitSize)
  }
  cb()
}

// NOTE: 把 chunk pipe 給 passthrough，passthrough on data 時的資料 size 就會是我們要的 size
const chunkStream = new Chunk(BUFFER_SIZE * 4)
const passStream = new PassThrough()
chunkStream.pipe(passStream)
passStream.on('data', data => {
  rtAudio.write(data)
})

const WebRTC = function () {
  this.peer = new SimplePeerJs({
    wrtc,
    fetch,
    WebSocket,
    // stream: true
  })
  this.peerId = ''
  _init.call(this)
  this.peer.on('connect', client => {
    rtAudio.openStream(
      {
        deviceId: rtAudio.getDefaultOutputDevice(),
        nChannels: 1,
        firstChannel: 0
      },
      null,
      RtAudioFormat.RTAUDIO_SINT16,
      48000,
      1024, // 這裡要是buffer的兩倍
      'MyStream',
      null,
      null,
      RtAudioStreamFlags.RTAUDIO_SCHEDULE_REALTIME
    )
    rtAudio.start()

    console.log('Peer connected client:', client.peerId);
    client.peer.on('data', data => {
      chunkStream.write(data)
    })

    client.peer.on('stream', stream => {
      console.log('on stream ');
      console.log(stream);
      // chunkStream.write(stream)

      
    })

    client.peer.on('close', () => {
      console.log(`client is close`);
      rtAudio.closeStream()
    })
    
  })

}

const _init = async function () {
  this.peerId = await this.peer.id
  console.log(`server peer id = ${this.peerId}`);
}

WebRTC.prototype.connect = async function () {
  const clientPeer = new SimplePeerJs({
    wrtc,
    fetch,
    WebSocket
  })
  await clientPeer.connect(this.peerId)
  return clientPeer
}
module.exports = new WebRTC()


