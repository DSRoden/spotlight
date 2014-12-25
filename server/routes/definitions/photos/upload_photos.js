'use strict';

var Photo = require('../../../models/photo');

module.exports = {
  description: 'Upload a Photo',
  tags:['photos'],
  validate: {
    payload:{
      maxBytes: 20500500
    }
  },
  handler: function(request, reply, socket){
    console.log('inside handler, request', request);
    console.log('inside handler, socket', socket);

    Photo.uploadmobilephoto(request.auth.credentials, request.payload.b64, function(imageObj){
      if(!imageObj){reply().code(400);}
      console.log('image object returning to definitions', imageObj);
      socket.emit('image', imageObj);
      reply().code(200);
    });
  }
};
