'use strict';

module.exports = function(data){
  var socket = this;
    socket.emit('areYouTheSpotlight', data);
    socket.broadcast.emit('areYouTheSpotlight', data);
    console.log('data', data);
};
