'use strict';

var Day = require('../../../models/day');

module.exports = {
  description: 'Query Days',
  tags:['days'],
  handler: function(request, reply){
    Day.query(function(err, days){
      //console.log('getting messages back in query', days);
      reply(days).code(err ? 400 : 200);
    });
  }
};
