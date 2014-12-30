'use strict';

//var User = require('../models/user'),
var Message = require('../models/message');

module.exports = function(data){
  console.log('data from like', data);
  var socket = this;
  Message.like(data, function(response){
    console.log('response from message.like in sockets folder>>>>>>', response);
    socket.emit('newLike', response);
    socket.broadcast.emit('newLike', response);
  });
};
