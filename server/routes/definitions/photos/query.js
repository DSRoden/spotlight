'use strict';

var Photo = require('../../../models/photo');

module.exports = {
  description: 'Query Photos',
  tags:['photos'],
  auth: false,
  handler: function(request, reply){
    Photo.query(function(err, photos){
      console.log('getting messages back in query', photos);
      reply(photos).code(err ? 400 : 200);
    });
  }
};
