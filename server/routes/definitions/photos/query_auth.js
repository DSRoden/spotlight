'use strict';

var Photo = require('../../../models/photo');

module.exports = {
  description: 'Query Photos',
  tags:['images'],
  handler: function(request, reply){
    Photo.queryAuth(request.auth.credentials, function(err, photos){
      console.log('getting messages back in query', photos);
      reply(photos).code(err ? 400 : 200);
    });
  }
};
