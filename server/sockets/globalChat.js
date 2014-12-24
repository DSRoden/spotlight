'use strict';

var User = require('../models/user'),
    Message = require('../models/message');

module.exports = function(data){
    //console.log('data from chat', data);
    var socket = this;
    User.secureSpotlight(data.id, function(obj){
      //console.log('spotlight secure', obj);
      if(!obj){return;}
      Message.record({dayId : obj.dayId, userId: data.id, content: data.content}, function(response){
        if(!response){return;}
        //console.log('message saved, emitting now', response);
        data.time = response.time;
        data.id = response.id;
        console.log('data being returned from socket message', data);
        socket.emit('bGlobalChat', data);
        socket.broadcast.emit('bGlobalChat', data);
      });
    });
};
