const SimplePeerJs = require('simple-peerjs')


// 從Recordjs改寫的
let flag = false
const WebRTC = function (source, cfg) {
  this.peer = new SimplePeerJs({
    secure: true,
  })
  this.peerId = ''
  _init.call(this)
  this.context = source.context;
  var config = cfg || {};
  var bufferLen = config.bufferLen || 4096;
  this.node = (this.context.createScriptProcessor ||
    this.context.createJavaScriptNode).call(this.context,
      256, 2, 2);
  this.peerConnect = ''

  this.node.onaudioprocess = (e) => {
    if (!flag) return
    const left = e.inputBuffer.getChannelData(0);
    this.peerConnect.peer.send(convertFloat32ToInt16(left))
  }

  function convertFloat32ToInt16(buffer) {
    l = buffer.length;
    buf = new Int16Array(l);
    while (l--) {
      buf[l] = Math.min(1, buffer[l])*0x7FFF;
    }
    return buf.buffer;
  }
  source.connect(this.node);
  this.node.connect(this.context.destination)
}


async function _init() {
  this.peerId = await this.peer.id
}

WebRTC.prototype.connect = async function (id) {
  this.peerConnect = await this.peer.connect(id)
}

WebRTC.prototype.start = function () {
  flag = true
  console.log('start');
}
WebRTC.prototype.stop = function () {
  flag = false
  console.log('stop');
}

module.exports = WebRTC



