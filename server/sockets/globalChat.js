'use strict';

var User = require('../models/user'),
    Message = require('../models/message');

module.exports = function(data){
    console.log('data from chat', data);
    var socket = this;
    User.secureSpotlight(data.id, function(obj){
      if(!obj){return;}
      Message.record({dayId : obj.dayId, userId: data.id, content: data.content}, function(response){
        if(!response){return;}
        console.log('message saved, emitting now', response);
        socket.emit('bGlobalChat', data);
        socket.broadcast.emit('bGlobalChat', data);
      });
    });
};
