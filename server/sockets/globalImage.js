'use strict';

module.exports = function(data){
  console.log('data from image', data);
  var socket = this;
  socket.emit('bGlobalImage', data);
  socket.broadcast.emit('bGlobalImage', data);
};
