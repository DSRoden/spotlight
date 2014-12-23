'use strict';

var Joi  = require('joi'),
User = require('../../../models/user');

module.exports = {
  description: 'Select a Winner',
  tags:['notes'],
  validate: {
    payload: {
      id: Joi.number().required()
    }
  },
  handler: function(request, reply){
    //console.log('getting payload in winner route', request.payload);
    User.selectWinner(request.auth.credentials, request.payload, function(err,user){
    //  console.log(user);
      reply(user).code(err ? 400 : 200);
    });
  }
};
