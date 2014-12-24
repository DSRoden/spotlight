'use strict';

var Joi  = require('joi'),
User = require('../../../models/user');

module.exports = {
  description: 'Login a User',
  tags:['users'],
  validate: {
    payload: {
      password: Joi.string().required()
    }
  },
  handler: function(request, reply){
    User.validateSpotlight(request.auth.credentials, request.payload, function(validation){
      if(!validation){return reply().code(401);}
      //console.log('user coming back after validation', validation);
      // request.auth.session.set(user);
       reply(validation);
    });
  }
};
