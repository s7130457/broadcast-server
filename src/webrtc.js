const wrtc = require('wrtc');
const fetch = require('node-fetch');
const WebSocket = require('ws');
const SimplePeerJs = require('simple-peerjs');

const WebRTC = function () {

  this.peer = new SimplePeerJs({
    wrtc,
    fetch,
    WebSocket
  })
  this.peerId = ''
  _init.call(this)

  this.peer.on('connect', client => {
    console.log('Peer connected client:', client.peerId);
    client.peer.on('data', data => {
      // todo rtAudio
      console.log(`Received data`);
      console.log(data.length);
      
      // console.log('Received data ::', data.toString());
      client.peer.send('server send to client: :)');
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


