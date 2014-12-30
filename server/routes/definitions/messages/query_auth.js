'use strict';

var Message = require('../../../models/message');

module.exports = {
  description: 'Query Messages',
  tags:['messages'],
  handler: function(request, reply){
    Message.queryAuth(request.auth.credentials, function(err, messages){
      console.log('getting messages back in query', messages);
      reply(messages).code(err ? 400 : 200);
    });
  }
};
