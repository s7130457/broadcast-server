const util = require('util')
const EventEmitter = require('events').EventEmitter

const Broadcast = function () {
  this.clientIp = ''
}

Broadcast.prototype.status = function () {
  return !!this.clientIp
}

Broadcast.prototype.start = function (reqIp) {
  console.log(`Broadcast Service start`);
  console.log(`沒人在廣播，同意！`);
  this.clientIp = reqIp
  
}

Broadcast.prototype.stop = function () {
  console.log(`Broadcast Service stop`);
  console.log(`廣播結束囉～`);
  
  this.clientIp = ''
  
}


util.inherits(Broadcast, EventEmitter)

module.exports = exports = new Broadcast()