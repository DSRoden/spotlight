'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Register a User',
  tags:['users'],
  validate: {
    payload: {
      username: Joi.string().min(3).max(12).required(),
      password: Joi.string().min(3).required(),
      email: Joi.string().min(3).required(),
      phone: Joi.string()
    }
  },
  auth: false,
  handler: function(request, reply){
    console.log('user payload', request.payload);
    User.register(request.payload, function(err){
      console.log('error from register>>>>>>', err);
      reply().code(err ? 400 : 200);
    });
  }
};
