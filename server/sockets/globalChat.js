'use strict';

var User = require('../models/user');

module.exports = function(data){
    var socket = this;
    User.secureSpotlight(data.id, function(user){
      if(!user){return;}
      socket.emit('bGlobalChat', data);
      socket.broadcast.emit('bGlobalChat', data);
      console.log('data', data);
    });
};
