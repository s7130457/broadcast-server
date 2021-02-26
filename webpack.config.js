const path = require('path')

module.exports = {
  entry: './public/WebRTC/index.js',
  // entry: './public/Recoderjs/webrtc.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, './dist'),
  }
}