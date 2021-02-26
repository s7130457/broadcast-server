const SimplePeerJs = require('simple-peerjs')


// 從Recordjs改寫的
const WebRTC = function (source, cfg) {

  console.log(source);
  this.record = false
  
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
      bufferLen, 2, 2);

  source.connect(this.node);
  this.node.connect(this.context.destination);
  // console.log('stream');
  // console.log(stream);


  this.peerConnect = ''


  this.node.onaudioprocess = function(e){
    // console.log('e');
    // console.log(e);
    if (! this.record) return
    
    const left = e.inputBuffer.getChannelData(0);
    console.log(this.peerConnect);
    
    this.peerConnect.peer.send(convertFloat32ToInt16(left))
    // console.log('left');
    // console.log(left);
    
  }

  function convertFloat32ToInt16(buffer) {
    l = buffer.length;
    buf = new Int16Array(l);
    while (l--) {
      buf[l] = Math.min(1, buffer[l])*0x7FFF;
    }
    return buf.buffer;
  }

}


async function _init() {
  this.peerId = await this.peer.id
}

WebRTC.prototype.connect = async function (id) {
  this.peerConnect = await this.peer.connect(id)
  // this.peer.addStream(window.stream)
}

WebRTC.prototype.start = function () {
  this.record = true
  // this.peerConnect.peer.send(window.stream)
}
WebRTC.prototype.stop = function () {
  this.record = false
  console.log('stop');
  
}

module.exports = WebRTC



