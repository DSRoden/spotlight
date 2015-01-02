'use strict';

var Joi  = require('joi'),
Day = require('../../../models/day');

module.exports = {
  description: 'Show Day',
  tags:['day'],
  validate: {
    payload: {
      dayId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Day.show(request.payload.dayId, function(err, day){
      console.log('err', err);
      reply(day).code(err ? 400 : 200);
    });
  }
};
