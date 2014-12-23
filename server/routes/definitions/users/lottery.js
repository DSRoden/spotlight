'use strict';


var User = require('../../../models/user');

module.exports = {
  description: 'get all users',
  tags:['users'],
  handler: function(request, reply){
    console.log('in definitions, trying to get users');
    User.runLottery(request.auth.credentials.id, function(winner){
      console.log('getting back winner', winner);
      winner.password = null;
      winner.token = null;
      reply(winner).code(200);
    });
  }
};
