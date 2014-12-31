'use strict';

var Photo = require('../models/photo');

module.exports = function(data){
  console.log('data from like', data);
  var socket = this;
  Photo.like(data, function(response){
    console.log('response from message.like in sockets folder>>>>>>', response);
    socket.emit('newLike', response);
    socket.broadcast.emit('newLike', response);
  });
};
